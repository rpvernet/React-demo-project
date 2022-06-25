import styled from 'styled-components';


export const LikeDislikeContainer = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  border-top: 1px gray solid;
`;

export const PostContainer = styled.div`
  max-width:850px;
  height:100%;
  display: flex;
  flex-direction: column;
  margin: 25px auto;
  justify-content: space-between;  
  border-top: 3px black solid;
  border-bottom: 3px white solid;
  background-color: white;
`;

export const PostContent = styled.p`
  white-space: pre-line;
  margin: 10px 10px;
`;

export const DiplayName = styled.p`
  color:grey;
  font-size: 12px;
  margin: 5px 10px;
`;

export const DateP= styled.p`
  color:grey;
  font-size: 12px;
  margin: 5px 10px;
`;

export const PostTitle = styled.h1`
  margin: 5px 10px;
`;

