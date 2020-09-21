import React, { useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
} from './styles';

interface RouteParams {
  providerId: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { goBack } = useNavigation();

  const route = useRoute();
  const { providerId } = route.params as RouteParams;

  const handleGoBackButton = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleGoBackButton}>
          <Icon name="chevron-left" size={24} color="#999591" />

          <HeaderTitle>Cabeleireiros</HeaderTitle>
        </BackButton>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>
    </Container>
  );
};

export default Dashboard;
