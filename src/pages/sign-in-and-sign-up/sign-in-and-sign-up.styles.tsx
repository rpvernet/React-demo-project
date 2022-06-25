import styled from 'styled-components';

export const SignInAndSignUpContainer = styled.div`
  max-width: 850px;
  display: flex;
  justify-content: space-between;
  margin: 30px auto;
  background-color: white;
  padding: 20px;
  @media (max-width:880px){
    flex-direction: column;
  }

`;