import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
  padding: ${RFValue(20)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(22)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.title};
  margin-bottom: ${RFValue(10)}px;
`;

export const Challenge = styled(RectButton)`
  width: ${RFValue(140)}px;
  border-radius: ${RFValue(16)}px;
  padding: ${RFValue(20)}px;
  margin: ${RFValue(5)}px 0px;
  background: ${({ theme }) => theme.colors.white};
  justify-content: space-between;
  gap: ${RFValue(10)}px;
`;

export const ChallengeContainerText = styled.View``;

export const ChallengeTitle = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.title};
`;

export const ChallengeSubTitle = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
`;

export const ChallengeDone = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.green};
`;