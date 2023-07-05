import { TouchableOpacityProps, ActivityIndicator } from 'react-native';

import { ButtonText, Container } from './styles';

interface IProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
}

export function Button({ title, loading, ...rest }: IProps) {
  return (
    <Container activeOpacity={0.6} disabled={loading} {...rest}>
      <ButtonText numberOfLines={1}>{title}</ButtonText>
      {loading && <ActivityIndicator color="#FFFFFF" />}
    </Container>
  )
}