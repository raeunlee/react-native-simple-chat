import React, { useState, useRef, useEffect, useContext } from 'react';
import { ProgressContext, UserContext } from '../contexts';
import styled from 'styled-components/native';
import { Image, Input, Button } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, removeWhitespace } from '../utils/common';
import { images } from '../utils/images';
import { Alert } from 'react-native';
import { signup } from '../utils/firebase';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 250px 20px;
`;
const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

const Signup = () => {
  const [photoUrl, setPhotoUrl] = useState(images.photo);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  useEffect(() => {
      let _errorMessage = '';
      if (!name) {
        _errorMessage = '이름을 입력해주세요';
      } else if (!validateEmail(email)) {
        _errorMessage = '이메일을 입력해주세요';
      } else if (password.length < 8) {
        _errorMessage = '비밀번호는 최소 8자 이상이어야 합니다';
      } else if (password !== passwordConfirm) {
        _errorMessage = '비밀번호가 일치하지 않습니다';
      } else {
        _errorMessage = '';
      }
      setErrorMessage(_errorMessage);
    } , [name, email, password, passwordConfirm]);

  useEffect(() => {
    setDisabled(
      !(name && email && password && passwordConfirm && !errorMessage)
    );
  }, [name, email, password, passwordConfirm, errorMessage]);

  const _handleSignupButtonPress = () => {}

  return (
    <KeyboardAwareScrollView extraScrollHeight={20}>
      <Container>
        <Image
          rounded
          url={photoUrl}
          showButton
          onChangeImage={url => setPhotoUrl(url)}
        />

        <Input
          label="Name"
          value={name}
          onChangeText={text => setName(text)}
          onSubmitEditing={() => {
            setName(name.trim());
            emailRef.current.focus();
          }}
          onBlur={() => setName(name.trim())}
          placeholder="Name"
          returnKeyType="next"
        />

        <Input
          ref={emailRef}
          label="Email"
          value={email}
          onChangeText={text => setEmail(removeWhitespace(text))}
          onSubmitEditing={() => passwordRef.current.focus()}
          placeholder="Email"
          returnKeyType="next"
        />

        <Input
          ref={passwordRef}
          label="Password"
          value={password}
          onChangeText={text => setPassword(removeWhitespace(text))}
          onSubmitEditing={() => passwordConfirmRef.current.focus()}
          placeholder="Password"
          returnKeyType="done"
          isPassword
        />

        <Input
          ref={passwordConfirmRef}
          label="Password Confirm"
          value={passwordConfirm}
          onChangeText={text => setPasswordConfirm(removeWhitespace(text))}
          onSubmitEditing={_handleSignupButtonPress}
          placeholder="Password"
          returnKeyType="done"
          isPassword
        />

        <ErrorText>{errorMessage}</ErrorText>
        <Button
          title="Signup"
          onPress={_handleSignupButtonPress}
          disabled={disabled}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Signup;
