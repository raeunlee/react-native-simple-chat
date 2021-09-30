//올바른 이메일 형식 & 문자열의 공백을 모두 제거하는 함수 생성, 이메일에는 공백이 없기때문

export const validateEmail = email => {
    const regex = /^[0-9?A-z0-9?]+(\.)?[0-9?A-z0-9?]+@[0-9?A-z]+\.[A-z]{2}.?[A-z]{0,3}$/;
    return regex.test(email);
  };
  
  export const removeWhitespace = text => {
    const regex = /\s/g;
    return text.replace(regex, '');
  };
  