import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';

import { Button, ImageContainer, Text } from './styles';

interface Props extends RectButtonProps {
  title: string;
  type?: 'google' | 'apple';
}

export function SignInSocialButton({ title, type = 'google', ...rest }: Props) {
  return (
    <Button {...rest}>
      <ImageContainer>
        {type === 'google' ? (
          <GoogleSvg />
        ) : (
          <AppleSvg />
        )}
      </ImageContainer>

      <Text>{title}</Text>
    </Button>
  )
}