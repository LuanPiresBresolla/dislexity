import React from 'react';
import { StyleSheet } from 'react-native';

import { Container, TextExperience, Experience, ExperienceCurrent, TextExperienceCurrent } from './styles';

export function ExperienceBar() {
  const level = 3;
  const currentExperience = 70;
  const challengesCompleted = 0;

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  const percentToNextLevel = (Math.round(currentExperience * 100)) / experienceToNextLevel;

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