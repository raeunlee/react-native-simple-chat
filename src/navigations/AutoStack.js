//로그인, 회면가입을 위한 스택내비게이션 로그인 -> 회원가입으로 이동

import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login , Signup } from '../screens';

const Stack = createStackNavigator();

const AuthStack = () => {
    const theme = useContext(ThemeContext);
    return (
        <Stack.Navigator
            initialRouteName = "Login"
            screenOptions = {{
                headerTitleAlign: 'center',
                cardStyle: {backgroundColor: theme.backgroundColor},
            }}
        >
            <Stack.Screen name="Login" component = {Login} />
            <Stack.Screen name="Signup" component = {Signup} />
        </Stack.Navigator>
    );
};

export default AuthStack;