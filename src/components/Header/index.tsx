import React from 'react';
import { Feather } from '@expo/vector-icons';

import { useAuth } from '@context/Auth';

import { Container, UserContent, AvatarContainer, Avatar, ChatAvatarName, Welcome, UserName, Logout } from './styles';
import { useTheme } from 'styled-components';

export function Header() {
  const { colors } = useTheme();
  const { user, signOut } = useAuth();

  return (
    <Container>
      <UserContent>
        <AvatarContainer>
          {user?.photo ? (
            <Avatar source={{ uri: user.photo }} />
          ) : (
            <ChatAvatarName>{user?.name.substring(0, 2)}</ChatAvatarName>
          )}
        </AvatarContainer>

        <Welcome>
          Bem vindo,{`\n`}
          <UserName numberOfLines={1}>{user?.name}</UserName>
        </Welcome>
      </UserContent>

      <Logout onPress={signOut}>
        <Feather name="log-out" size={25} color={colors.background} />
      </Logout>
    </Container>
  )
}