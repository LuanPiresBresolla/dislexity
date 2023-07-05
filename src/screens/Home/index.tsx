import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Loading } from '@components/Loading';

import Math from '@assets/math.svg';

import { Wrapper, Container, Title, Challenge, ChallengeContainerText, ChallengeTitle, ChallengeSubTitle } from './styles';

export function Home() {
  const { navigate } = useNavigation();

  const [loading, setLoading] = useState(true);

  const [challenges, setChallenges] = useState<any[]>([]);

  useEffect(() => {
    firestore()
      .collection('challenges')
      .get()
      .then(response => {
        const data = response.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChallenges(data);
        setLoading(false);
      });
  }, []);

  function handleToChallenge(collection: string) {
    navigate('Challenge', { collection });
  }

  return (
    <Wrapper>
      <Header />

      <Loading loading={loading} message="Carregando seus desafios, aguarde..." />

      {!loading && (
        <Container>
          <Title>Desafios Disponíveis</Title>

          <FlatList
            data={challenges}
            keyExtractor={item => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Challenge onPress={() => handleToChallenge(item.collection)}>
                <Math />
                <ChallengeContainerText>
                  <ChallengeTitle>{item.title}</ChallengeTitle>
                  <ChallengeSubTitle>{item.challenges_count} {item.challenges_count > 1 ? 'Desafios' : 'Desafio'}</ChallengeSubTitle>
                </ChallengeContainerText>
              </Challenge>
            )}
          />
        </Container>
      )}
    </Wrapper>
  );
}