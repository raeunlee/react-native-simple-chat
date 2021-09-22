//props 로 전달되는 url 랜더링, imagestyle 을 전달받아 컴포넌트 스타일을 수정할 수 있는 Image 컴포넌트


import React from 'react';
import styled from 'styled-components/nat트ve';
import propTypes from 'prop-types';

const Container = styled.View`
    align-self:center;
    margin-botton:30px;
`;

const StyledImage = styled.Image`
    background-color: ${({ theme }) => theme.imageBackground};
    width: 100px;
    height: 100px;
`;

const Image= ({url, imageStyle}) => {
    return(
        <Container>
            <StyledImage source = {{ uri: url}} style = {imageStyle} />
        </Container>
    );
};

Image.propTypes = {
    uri:propTypes.string,
    imageStyle: propTypes.object
};

export default Image;
