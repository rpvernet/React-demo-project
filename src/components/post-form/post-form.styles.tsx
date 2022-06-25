import styled from 'styled-components';

export const PostFormContainer = styled.div`
  display: flex;
  width:100%;
`;

export const FormTest = styled.form`
  width:100%;
`;

export const StyledTextArea = styled.textarea`
  outline:none;
  border: 1px solid gray;
  resize: none;
  width: 100%;
  height:100%;
  margin-bottom:45px;
  box-sizing: border-box;
  color:black;
  font-style: inherit;
  font-family: inherit;
  font-size: 18px;

`;



export const TextAreaLabel = styled.label`
  color: grey;
  font-size: 18px;
  padding-bottom:10px;
  display: block;
  width: 100%;
`