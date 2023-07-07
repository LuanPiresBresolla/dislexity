import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Loading } from '@components/Loading';
import { ExperienceBar } from '@components/ExperienceBar';

import Math from '@assets/math.svg';

import { Wrapper, Container, Title, Challenge, ChallengeContainerText, ChallengeTitle, ChallengeSubTitle, ChallengeDone } from './styles';
import { useAuth } from '@context/Auth';
import { getAvailableVoicesAsync } from 'expo-speech';

export interface IChallenge {
  id: string;
  title: string;
  collection: string;
  challenges_count: number;
  created_at: number;
  done?: boolean;
}

export interface IChallengeUser {
  id: string;
  challenge_id: string;
  user_id: string;
  challenges_count_done: number;
  done: boolean;
}

export function Home() {
  const { navigate } = useNavigation();
  const { user } = useAuth();

  const [loadingChallenge, setLoadingChallenge] = useState(true);
  const [loadingChallengesUser, setLoadingChallengesUser] = useState(true);

  const loading = loadingChallenge || loadingChallengesUser;

  const [challenges, setChallenges] = useState<IChallenge[]>([]);
  const [challengesUser, setChallengesUser] = useState<IChallengeUser[]>([]);

  useEffect(() => {
    const subscribe = firestore()
      .collection('challenges')
      .onSnapshot(snapshotQuery => {
        const data = snapshotQuery.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as IChallenge[];
        setChallenges(data);
        setLoadingChallenge(false);
      });

    return () => subscribe();
  }, []);

  useEffect(() => {
    const subscribe = firestore()
      .collection('challenges_users')
      .where('user_id', '==', user?.id)
      .onSnapshot(snapshotQuery => {
        const data = snapshotQuery.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as IChallengeUser[];
        setChallengesUser(data);
        setLoadingChallengesUser(false);
      });

    return () => subscribe();
  }, []);

  function handleToChallenge(challenge: IChallenge) {
    navigate('Challenge', { challengeId: challenge.id, collection: challenge.collection });
  }

  return (
    <Wrapper>
      <Header />

      <Loading loading={loading} message="Carregando seus desafios, aguarde..." />

      {!loading && (
        <Container>
          <ExperienceBar />

          <Title>Desafios Disponíveis</Title>

          <FlatList
            data={challenges}
            keyExtractor={item => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const challengeUser = challengesUser.find(challenge => challenge.challenge_id === item.id);

              return (
                <Challenge enabled={!challengeUser?.done} onPress={() => handleToChallenge(item)}>
                  <Math />
                  <ChallengeContainerText>
                    <ChallengeTitle>{item.title}</ChallengeTitle>
                    <ChallengeSubTitle>{item.challenges_count} {item.challenges_count > 1 ? 'Desafios' : 'Desafio'}</ChallengeSubTitle>
                    {challengeUser?.done && <ChallengeDone>Concluído</ChallengeDone>}
                  </ChallengeContainerText>
                </Challenge>
              )
            }}
          />
        </Container>
      )}
    </Wrapper>
  );
}