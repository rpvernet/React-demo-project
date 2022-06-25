import styled from "styled-components";

export const ReplyFormContainer = styled.div`
  max-width: 850px;
  height:100%;  
  margin:5px 10px;
`;

export const StyledReplyTextArea = styled.textarea`
  outline:none;
  border: 1px solid gray;
  resize: none;
  width: 100%;
  height:75px;
  margin-bottom:5px;
  box-sizing: border-box;
  color:black;
  font-style: inherit;
  font-family: inherit;
  font-size: 16px;
`;

export const ReplyIconContainer = styled.div`
  margin:10px;
  svg {
    width: 22px;
    height: 16px;
  }
  
`;

export const ReplyIcon = styled.p`
  cursor:pointer;
  border-bottom:10px;
`;
