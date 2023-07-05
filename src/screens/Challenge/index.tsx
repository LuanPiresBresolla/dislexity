import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '@components/Button';

import { Container, Header, Image, OptionButton, OptionButtonText, OptionsContainer, Title } from './styles';
import { Alert, View } from 'react-native';
import { Loading } from '@components/Loading';
import { ButtonGoBack } from '@components/ButtonGoBack';

interface IChallenge {
  id: string;
  correct_option: string;
  done: boolean;
  image_url: string;
  options: string[];
  xp: number;
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

  useEffect(() => {
    firestore()
      .collection(collection)
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

  function handleConfirm() {
    if (challenge.correct_option === optionSelected) {
      Alert.alert(
        'Parábens, você acertou!',
        'Vamos avançar para o próximo nível 🚀',
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

  if (!challenge || loading) {
    return <Loading loading message="Carregando seus desafios, aguarde..." />
  }

  return (
    <Container>

      <Header>
        <ButtonGoBack />
        <Title>Qual é o animal? 🧐</Title>
        <View />
      </Header>

      <Image source={{ uri: challenge.image_url }} resizeMode="contain" />
      
      <OptionsContainer>
        {challenge.options.map(option => (
          <OptionButton
            key={option}
            onPress={() => setOptionSelected(option)}
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