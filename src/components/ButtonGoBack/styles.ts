import { BorderlessButton } from 'react-native-gesture-handler';
import { css } from 'styled-components';
import styled from 'styled-components/native';

interface IProps {
  position?: boolean;
}

export const Button = styled(BorderlessButton)<IProps>`
  ${({ position }) => position && css`
    position: absolute;
    top: 5%;
    left: 5%;
  `}
`;
