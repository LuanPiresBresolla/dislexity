import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const PurpleBox = styled.View`
  height: 35%;
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
`;

export const Child = styled.Image`
  width: ${RFValue(120)}px;
  margin-top: ${RFValue(20)}px;
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
  justify-content: space-between;
  align-items: center;
  padding: ${RFValue(80)}px ${RFValue(30)}px;
`;

export const Dislexity = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.Image`
  width: ${RFValue(200)}px;
  height: ${RFValue(100)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(36)}px;
  color: ${({ theme }) => theme.colors.title};
  margin-top: ${RFValue(30)}px;
`;

export const ButtonContainer = styled.View`
  justify-content: center;
  align-items: center;
`;
