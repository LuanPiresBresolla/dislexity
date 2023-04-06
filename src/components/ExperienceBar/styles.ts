import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  flex-direction: row;
  margin-bottom: ${RFValue(30)}px;
`;

export const TextExperience = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.title};
`;

export const Experience = styled.View`
  flex: 1;
  height: ${RFValue(4)}px;
  margin: 0px ${RFValue(10)}px;
  border-radius: ${RFValue(4)}px;
  background: ${({ theme }) => theme.colors.gray};
`;

export const ExperienceCurrent = styled.View`
  height: ${RFValue(4)}px;
  border-radius: ${RFValue(4)}px;
  background: ${({ theme }) => theme.colors.green};
`;

export const TextExperienceCurrent = styled.Text`
  position: absolute;
  top: 12px;
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.green};
`;