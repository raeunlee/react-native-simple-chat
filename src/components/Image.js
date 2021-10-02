//props 로 전달되는 url 랜더링, imagestyle 을 전달받아 컴포넌트 스타일을 수정할 수 있는 Image 컴포넌트
//라이브러리 접근 expo-image-picker 설치

import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


//아이콘 임포트 



const Container = styled.View`
    align-self:center;
    margin-bottom:30px;
`;

const StyledImage = styled.Image`
    background-color: ${({ theme }) => theme.imageBackground};
    width: 100px;
    height: 100px;
    border-radius: ${({rounded}) => (rounded ? 50 : 0)}px;
`;

//프로필 이미지 관련한 버튼
const profile_ButtonContainer = styled.TouchableOpacity`
    profile_ backgroud-color: ${ ( { theme }) => theme.profile_imageButtonBackground};
    position : absolute;
    bottom: 0;
    right: 0;
    width: 30px;
    height: 30px
    border-radius: 15px;
    justify - content: center;
    align - items : center;
`;

const profile_ButtonIcon = styled(MaterialIcons).attrs({
    name: 'photo-camera',
    size: 22,
})`

    color: ${({theme}) => theme.profile_imageButtonIcon};
`;

//프로팔 버튼 아이콘
const PhotoButton = ({ onPress }) => {
    return (
        <profile_ButtonContainer onPress = {onPress}>
            <profile_ButtonIcon />
        </profile_ButtonContainer>
    );
};

//프로필, 회원가입 사진 둥글게,,e둥글게,,둥그렉ㄱㅁㅇㄹㅁ?

//round 추가해야하는데,,, undefiend 뜸 이유를몰겠네 ㅋㅋ

const Image= ({url, imageStyle, rounded, showButton}) => {
    return(
        <Container>
            <StyledImage source={{ uri: url }} style={imageStyle} rounded={rounded}/>
            {/* {showButton && <photoButton />} */}

        </Container>
    );
};

Image.defaultProps = {
    rounded: false,
    showButton:false,
};

Image.propTypes = {
    uri:PropTypes.string,
    imageStyle: PropTypes.object,
    rounded: PropTypes.bool,
    showButton:PropTypes.bool,
};

export default Image;

