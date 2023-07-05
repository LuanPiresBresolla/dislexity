import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: ${RFValue(10)}px;
  
  width: 100%;

  border-radius: ${RFValue(10)}px;
  padding: ${RFValue(15)}px;
  background: ${({ theme }) => theme.colors.primary};
`;

export const ButtonText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.white};
`;