import { Feather } from '@expo/vector-icons';
import { BorderlessButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import { Button } from './styles';

interface IProps extends BorderlessButtonProps {
  position?: boolean;
}

export function ButtonGoBack({ position, ...rest }: IProps) {
  const { goBack } = useNavigation();
  const { colors } = useTheme();

  return (
    <Button position={position} onPress={goBack} {...rest}>
      <Feather name="chevron-left" size={30} color={colors.title} />
    </Button>
  )
}