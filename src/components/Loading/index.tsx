import React from 'react';
import { ActivityIndicator, ViewStyle } from 'react-native';
import { useTheme } from 'styled-components';

import { Container, Message } from './styles';

type LoadingProps = {
  loading: boolean;
  message?: string;
  containerStyle?: ViewStyle;
};

export function Loading({ loading, message, containerStyle }: LoadingProps) {
  const { colors } = useTheme();

  if (!loading) {
    return null;
  }

  return (
    <Container style={containerStyle}>
      <ActivityIndicator size="large" color={colors.primary} />
      {message && <Message>{message}</Message>}
    </Container>
  );
}
