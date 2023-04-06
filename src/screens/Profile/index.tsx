import React from 'react';
import { Text } from 'react-native';

import { ExperienceBar } from '@components/ExperienceBar';
import { useAuth } from '@context/Auth';

import LevelUp from '@assets/levelUp.svg';

import { Container, Avatar, AvatarName, Level, ProfileContainer, ProfileContent, UserName } from './styles';

export function Profile() {
  const { user } = useAuth();

  return (
    <Container>
      <ProfileContainer>
        {user?.photo ? (
          <Avatar source={{ uri: user?.photo }} />
        ) : (
          <AvatarName>{user?.name.substring(0, 2)}</AvatarName>
        )}

        <ProfileContent>
          <UserName>{user?.name}</UserName>
          <UserName>
            <LevelUp fontSize="20px" />
            Level 10
          </UserName>
        </ProfileContent>

      </ProfileContainer>

      <ExperienceBar />
      <Text>Profile Screen</Text>
    </Container>
  );
}