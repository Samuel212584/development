import React, { useRef, useCallback } from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Yup from 'yup';

import api from '../../services/api';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  GoBackButton,
  UserAvatarButton,
  UserAvatar,
  Title,
} from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  oldPassword: string;
  password: string;
  passwordConfirmation: string;
}

const SignUp: React.FC = () => {
  const { user, updateUser } = useAuth();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmationInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          oldPassword: Yup.string(),
          password: Yup.string().when('oldPassword', {
            is: val => !!val.length,
            then: Yup.string()
              .required('Campo obrigatório!')
              .min(6, 'Tamanho mínimo de 6 digitos'),
            otherwise: Yup.string(),
          }),
          passwordConfirmation: Yup.string().when('oldPassword', {
            is: val => !!val.length,
            then: Yup.string()
              .required('Confirmação de senha obrigatória')
              .oneOf([Yup.ref('password')], 'As senhas não conferem'),
            otherwise: Yup.string(),
          }),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          oldPassword,
          password,
          passwordConfirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(oldPassword
            ? {
                oldPassword,
                password,
                passwordConfirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        Alert.alert(
          'Perfil atualizado com sucesso!',
          'As informações do seu perfil foram atualizadas com sucesso.',
        );

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao fazer cadastro, tente novamente!',
        );
      }
    },
    [navigation],
  );

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <GoBackButton onPress={handleGoBack}>
              <Icon name="chevron-left" size={20} color="#999591" />
            </GoBackButton>

            <UserAvatarButton>
              <UserAvatar source={{ uri: user.avatar_url }} />
            </UserAvatarButton>

            <View>
              <Title>Meu Perfil</Title>
            </View>

            <Form initialData={user} ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current.focus();
                }}
              />

              <Input
                ref={emailInputRef}
                autoCorrect={false}
                keyboardType="email-address"
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  oldPasswordInputRef.current.focus();
                }}
              />

              <Input
                ref={oldPasswordInputRef}
                secureTextEntry
                containerStyle={{ marginTop: 16 }}
                textContentType="newPassword"
                returnKeyType="next"
                name="oldPassword"
                icon="lock"
                placeholder="Senha atual"
                onSubmitEditing={() => {
                  passwordInputRef.current.focus();
                }}
              />

              <Input
                ref={passwordInputRef}
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="next"
                name="password"
                icon="lock"
                placeholder="Nova senha"
                onSubmitEditing={() => {
                  passwordConfirmationInputRef.current.focus();
                }}
              />

              <Input
                ref={passwordConfirmationInputRef}
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="send"
                name="password"
                icon="lock"
                placeholder="Confirmação de senha"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Confirmar mudanças
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUp;
