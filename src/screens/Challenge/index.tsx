import React, { useEffect, useState } from 'react';
import { Alert, TouchableWithoutFeedback, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Button } from '@components/Button';
import { Loading } from '@components/Loading';
import { ButtonGoBack } from '@components/ButtonGoBack';

import { Speak } from '@utils/Speak';

import { Container, Header, Image, OptionButton, OptionButtonText, OptionsContainer, Title } from './styles';
import { useExperienceBar } from '@context/ExperienceBar';
import { useAuth } from '@context/Auth';
import { IChallengeUser } from '@screens/Home';

interface IChallenge {
  id: string;
  correct_option: string;
  done: boolean;
  image_url: string;
  options: string[];
  xp: number;
  created_at: number;
}

export function Challenge() {
  const { params } = useRoute();
  const { goBack } = useNavigation();
  const { user } = useAuth();
  const { handleUpdateXP } = useExperienceBar();

  const { challengeId, collection } = params as any;

  const [loading, setLoading] = useState(true);

  const [challenges, setChallenges] = useState<IChallenge[]>([]);
  const [challengeUser, setChallengeUser] = useState<IChallengeUser | null>(null);

  const [challengesCount, setChallengesCount] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [optionSelected, setOptionSelected] = useState<string | null>(null);

  const challenge = challenges[currentChallenge];

  const question = 'Qual é o animal?';
  const congratulations = 'Parabéns, você acertou!';
  const nextLevel = 'Vamos avançar para o próximo nível';
  const questionError = 'Ops, resposta errada!';
  const tryAgain = 'Vamos tentar novamente';

  useEffect(() => {
    const subscribe = firestore()
      .collection('challenges_users')
      .where('challenge_id', '==', challengeId)
      .where('user_id', '==', user?.id)
      .limit(1)
      .onSnapshot(snapshotQuery => {
        if (snapshotQuery.size > 0) {
          const data = snapshotQuery.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as IChallengeUser[];
          setChallengeUser(data[0]);
          setCurrentChallenge(data[0].challenges_count_done);
        } else {
          firestore()
            .collection('challenges_users')
            .add({
              challenge_id: challengeId,
              challenges_count_done: 0,
              done: false,
              user_id: user?.id,
            });
        }
      });

    return () => subscribe();
  }, [collection]);

  useEffect(() => {
    firestore()
      .collection(collection)
      .orderBy('created_at')
      .get()
      .then(response => {
        const data = response.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as IChallenge[];

        setChallengesCount(response.size);
        setChallenges(data);
        setLoading(false);
      });
  }, [collection]);

  useEffect(() => {
    if (!loading) handleSpeakTitle();
  }, [loading]);

  function handleSpeakTitle() {
    Speak(question);
  }

  function handleConfirm() {
    if (challenge.correct_option === optionSelected) {
      Speak(congratulations);
      handleUpdateXP(challenge.xp);
      Alert.alert(
        congratulations,
        nextLevel + ' 🚀',
        [
          {
            text: 'Continuar',
            onPress: () => {
              if (challengesCount === (currentChallenge + 1)) {
                handleUpdateChallenge();
                goBack();
              } else {
                handleUpdateChallenge();
                // setCurrentChallenge(state => state + 1);
              }
            }
          }
        ]
      );
    } else {
      Speak(questionError + tryAgain);
      Alert.alert(questionError, tryAgain + ' 😁');
    }
  }

  function handleSetOption(option: string) {
    Speak(option);
    setOptionSelected(option);
  }

  function handleUpdateChallenge() {
    const challengesCountDone = currentChallenge + 1;

    firestore()
      .collection('challenges_users')
      .doc(challengeUser?.id)
      .update({
        challenge_id: challengeId,
        challenges_count_done: challengesCountDone,
        done: challengesCount === challengesCountDone,
        user_id: user?.id,
      });
  }

  if (!challenge || loading) {
    return <Loading loading message="Carregando seus desafios, aguarde..." />
  }

  return (
    <Container>

      <Header>
        <ButtonGoBack />
        <TouchableWithoutFeedback onPress={handleSpeakTitle}>
          <Title>{question} 🧐</Title>
        </TouchableWithoutFeedback>
        <View />
      </Header>

      <Image source={{ uri: challenge.image_url }} resizeMode="contain" />

      <OptionsContainer>
        {challenge.options.map(option => (
          <OptionButton
            key={option}
            onPress={() => handleSetOption(option)}
            selected={option === optionSelected}
          >
            <OptionButtonText>{option}</OptionButtonText>
          </OptionButton>
        ))}
      </OptionsContainer>

      <Button title="Confirmar" onPress={handleConfirm} disabled={!optionSelected} />
    </Container>
  );
}