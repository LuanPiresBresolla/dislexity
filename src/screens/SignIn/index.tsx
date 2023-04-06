import React from 'react';
import { Platform } from 'react-native';

import logo from '@assets/dislexity.png';
import child from '@assets/child.png';

import { SignInSocialButton } from '@components/SignInSocialButton';

import { Container, Content, Dislexity, Logo, PurpleBox, Child, Title, ButtonContainer } from './styles';
import { useAuth } from '@context/Auth';

export function SignIn() {
  const { signInWithGoogle } = useAuth();

  async function handleSignIn() {
    await signInWithGoogle();
  }

  return (
    <Container>
      <PurpleBox>
        <Child source={child} resizeMode="contain" />
      </PurpleBox>

      <Content>
        <Dislexity>
          <Logo source={logo} resizeMode="contain" />
          <Title>Dislexity</Title>
        </Dislexity>

        <ButtonContainer>
          <SignInSocialButton title="Entrar com Google" onPress={handleSignIn} />
          {Platform.OS === 'ios' && <SignInSocialButton title="Entrar com Apple" type="apple" />}
        </ButtonContainer>
      </Content>
    </Container>
  )
}