import React from 'react';
import { FlatList } from 'react-native';

import { Header } from '@components/Header';

import Math from '@assets/math.svg';

import { Wrapper, Container, Title, Challenge, ChallengeContainerText, ChallengeTitle, ChallengeSubTitle } from './styles';

const challenges = [
  {
    id: '1',
    title: 'Matemática',
    subtitle: '15 tarefas'
  },
  {
    id: '2',
    title: 'Inglês',
    subtitle: '15 tarefas'
  },
  {
    id: '3',
    title: 'História',
    subtitle: '15 tarefas'
  },
  {
    id: '4',
    title: 'Português',
    subtitle: '15 tarefas'
  },
  {
    id: '5',
    title: 'Espanhol',
    subtitle: '15 tarefas'
  },
  {
    id: '6',
    title: 'Artes',
    subtitle: '15 tarefas'
  },
  {
    id: '7',
    title: 'Tecnologia',
    subtitle: '15 tarefas'
  },
  {
    id: '8',
    title: 'Redes',
    subtitle: '15 tarefas'
  },
  {
    id: '9',
    title: 'Programação',
    subtitle: '15 tarefas'
  }
];

export function Home() {
  return (
    <Wrapper>
      <Header />
      
      <Container>        
        <Title>Desafios Disponíveis</Title>

        <FlatList
          data={challenges}
          keyExtractor={item => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Challenge>
              <Math />
              <ChallengeContainerText>
                <ChallengeTitle>{item.title}</ChallengeTitle>
                <ChallengeSubTitle>{item.subtitle}</ChallengeSubTitle>
              </ChallengeContainerText>
            </Challenge>
          )}
        />
      </Container>
    </Wrapper>
  );
}