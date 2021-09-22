//(회원가입으로 이동할 수 있는) 로그인 화면 
import React from 'react';
import styled from 'styled-components/native';
import{ Text, Button } from 'react-native';

const Container = styled.View`
    flex:1;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.background};
`;

//회원가입 버튼 구현
const Login = ({navigation}) => {
    return(
        <Container>
            <Text style = {{fontSize : 30}} > Login Screen</Text>
            <Button title = "Sign up" on Press = {() => navigation.navigates('Signup')} />
        </Container>
    );
};

export default Login;

