import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AutoStack";


//NavicagitonContainer 컴포넌트 사용, 로긴회원가입에 사용한 AuthStack은 자식 컴포넌트로
const Navigation = () => {
    return(
        <NavigationContainer>
            <AuthStack/>
        </NavigationContainer>
    );
};

export default Navigation;
