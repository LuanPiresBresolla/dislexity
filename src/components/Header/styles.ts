import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

const height = getStatusBarHeight();

export const Container = styled.View`
  width: 100%;
  height: ${RFValue(60) + height}px;
  background: ${({ theme }) => theme.colors.primary};

  padding: ${height}px ${RFValue(15)}px 0;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const UserContent = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
`;

export const AvatarContainer = styled.View`
  width: ${RFValue(52)}px;
  height: ${RFValue(52)}px;
  border-radius: ${RFValue(26)}px;
  margin-right: 12px;
  background: ${({ theme }) => theme.colors.background};
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.white};
`;

export const Avatar = styled.Image`
  width: ${RFValue(50)}px;
  height: ${RFValue(50)}px;
  border-radius: ${RFValue(25)}px;
`;

export const ChatAvatarName = styled.Text`
  font-size: ${RFValue(25)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

export const Welcome = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.white};
  line-height: ${RFValue(20)}px;
`;

export const UserName = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.white};
`;

export const Logout = styled.TouchableOpacity``;
