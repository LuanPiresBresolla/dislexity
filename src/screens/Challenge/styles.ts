import { RFValue } from 'react-native-responsive-fontsize';
import { css } from 'styled-components';
import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

const height = getStatusBarHeight();

interface IOptionButtonProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
  padding: ${RFValue(20)}px;
  margin-top: ${RFValue(height)}px;  
  align-items: center;
  gap: ${RFValue(40)}px;
  overflow: hidden;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Title = styled.Text`
  font-size: ${RFValue(22)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.title};
`;

export const Image = styled.Image`
  width: ${RFValue(250)}px;
  height: ${RFValue(250)}px;
  border-radius: ${RFValue(10)}px;
`;

export const OptionsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: ${RFValue(10)}px;
`;

export const OptionButton = styled.TouchableOpacity<IOptionButtonProps>`
  border-radius: ${RFValue(10)}px;
  padding: ${RFValue(10)}px;
  background: ${({ theme }) => theme.colors.white};
  border: ${RFValue(2)}px solid #FFF;
  
  ${({ selected }) => selected && css`
    border-color: ${({ theme }) => theme.colors.primary};
  `}
`;

export const OptionButtonText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.title};
`;