import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '@components/Button';

import { Container, Header, Image, OptionButton, OptionButtonText, OptionsContainer, Title } from './styles';
import { Alert, TouchableWithoutFeedback, View } from 'react-native';
import { Loading } from '@components/Loading';
import { ButtonGoBack } from '@components/ButtonGoBack';
import { speak } from 'expo-speech';
import { Speak } from '@utils/Speak';

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

  const { collection } = params as any;

  const [loading, setLoading] = useState(true);

  const [challenges, setChallenges] = useState<IChallenge[]>([]);
  const [challengesCount, setChallengesCount] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [optionSelected, setOptionSelected] = useState<string | null>(null);

  const challenge = challenges[currentChallenge];
  const question = 'Qual é o animal?';
  const congratulations = 'Parabéns, você acertou!';
  const nextLevel = 'Vamos avançar para o próximo nível';

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
      Speak(congratulations + nextLevel);
      Alert.alert(
        congratulations,
        nextLevel + ' 🚀',
        [
          {
            text: 'Continuar',
            onPress: () => {
              if (challengesCount === (currentChallenge + 1)) {
                goBack();
              } else {
                setCurrentChallenge(state => state + 1);
              }
            }
          }
        ]
      );
    } else {
      Alert.alert('Ops, resposta errada!', 'Vamos tentar novamente 😁');
    }
  }

  function handleSetOption(option: string) {
    Speak(option);
    setOptionSelected(option);
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

      <Button title="Confirmar" onPress={handleConfirm} />
    </Container>
  );
}