import React, { useState, useRef, useEffect, useContext } from 'react';
import { ProgressContext, UserContext } from '../contexts';
import styled from 'styled-components/native';
import { Image, Input, Button } from '../components';
import { images } from '../utils/images';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, removeWhitespace } from '../utils/common';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

//파이어베이스 로그인
import { Alert } from 'react-native';
import { login } from '../utils/firebase';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
  padding-top: ${({ insets: { top } }) => top}px;
  padding-bottom: ${({ insets: { bottom } }) => bottom}px;
`;
const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

//useRef -> Input 컴포넌트에서 next 누를시 포커스가 이동됨 -> PasswordRef
//spinner->진행중인 표시
//useSafeAreaInsets -> 아이폰 노치디자인에 헤더 잘리는 것 보안해준다고함

const Login = ({ navigation }) => {
  const { dispatch } = useContext(UserContext);

  const { spinner } = useContext(ProgressContext);

  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const passwordRef = useRef();

  const [errorMessage, setErrorMessage] = useState('');

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!(email && password && !errorMessage));}, [email, password, errorMessage]);

  //올바른 이메일 형식인지 확인
  const _handleEmailChange = email => {
    const changedEmail = removeWhitespace(email);
    setEmail(changedEmail);
    setErrorMessage(
      validateEmail(changedEmail) ? '' : '이메일을 다시 확인해주세요'
    );
  };

  //올바른 비번인지 확인
  const _handlePasswordChange = password => {
    setPassword(removeWhitespace(password));
  };


  //spinner 사용안하는 방향으로 가야겠네ㅋㅋ  아~남 사용하기~~~로딩중 나타남
  const _handleLoginButtonPress = async () => {
    try {
      spinner.start();
      const user = await login({ email, password });
      Alert.alert('로그인 성공', user.email);
      dispatch(user);
    } 
    catch (e) {
      Alert.alert('로그인 살패', e.message);
    } 
    finally {
      spinner.stop()
    }
  };

//키보드 감추기를 위한 keyboardawarescrollview 라이브러리 => 입력 도중 다른 영역을 터지 하면 키보드 사라지고, 스크롤 이동되는 것 가능
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={20}
    >
      <Container insets={insets}>
        <Image url={images.logo} imageStyle={{ borderRadius: 8 }} />
        <Input
          label="Email"
          value={email}
          onChangeText={_handleEmailChange}
          onSubmitEditing={() => passwordRef.current.focus()}
          placeholder="이메일을 입력해주세요"
          returnKeyType="next"
        />


        <Input
          ref={passwordRef}
          label="Password"
          value={password}
          onChangeText={_handlePasswordChange}
          onSubmitEditing={_handleLoginButtonPress}
          placeholder="비밀번호를 입력해주세요"
          returnKeyType="done"
          isPassword
        />



        <ErrorText>{errorMessage}</ErrorText>
        <Button
          title="로그인"
          onPress={_handleLoginButtonPress}
          disabled={disabled}
        />
        <Button
          title="이메일로 가입하기"
          onPress={() => navigation.navigate('Signup')}
          isFilled={false}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Login;
