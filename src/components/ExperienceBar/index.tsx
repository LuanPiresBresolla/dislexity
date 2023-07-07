import React from 'react';
import { StyleSheet } from 'react-native';

import { Container, TextExperience, Experience, ExperienceCurrent, TextExperienceCurrent } from './styles';
import { useExperienceBar } from '@context/ExperienceBar';

export function ExperienceBar() {
  const { currentExperience, experienceToNextLevel, percentToNextLevel } = useExperienceBar();

  return (
    <Container>
      <TextExperience>0 XP</TextExperience>
      <Experience>
        <ExperienceCurrent style={{ width: `${percentToNextLevel}%` }} />
        <TextExperienceCurrent style={{ left: `${percentToNextLevel}%` }}>{currentExperience} XP</TextExperienceCurrent>
      </Experience>
      <TextExperience>{experienceToNextLevel} XP</TextExperience>
    </Container>
  )
}

const styles = StyleSheet.create({
  textExperienceCurrent: {
    transform: [
      {
        translateX: 100,
      }
    ]
  }
});