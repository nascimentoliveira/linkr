import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

import BoxMetadata from "./BoxMetadata";
import Edit from "./Edit";
import Delete from "./Delete";
import Text from "./Text";
import UserContext from "../../contexts/userContext";

export default function Right({ postId, postUserId, postUsername, postText, postLink, postStates }) {

  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [text, setText] = useState(postText);
  const [oldText, setOldText] = useState("");
  const rightStates = {
    editMode,
    setEditMode,
    text,
    setText,
    oldText,
    setOldText,
  };

  return (
    <RightStyled>
      <Options>
        <h1 onClick={() => navigate(`/users/${postUserId}`)}>{postUsername}</h1>
        {postUserId === user.id ?
          <EditDelete>
            <Edit
              rightStates={rightStates}
            />
            <Delete
              postId={postId}
              postStates={postStates}
            />
          </EditDelete>
          :
          <EditDelete />
        }
      </Options>
      <Text
        postId={postId}
        text={postText}
        rightStates={rightStates}
      />
      <BoxMetadata
        title={postLink.title}
        description={postLink.description}
        url={postLink.url}
        urlImage={postLink.image}
      />
    </RightStyled>
  );
}

const RightStyled = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  word-wrap: break-word;
  text-overflow: ellipsis;
  overflow-y: auto;
  position: relative;
  width: 100%;
  h1 {
    cursor: pointer;
  }
  span {
    padding: 0;
    margin-bottom: 5px;
  }
  textarea {
    width: 100%;
    height: 44px;
    padding-left: 10px;
    padding-top: 4px;
    padding-bottom: 4px;
    display: flex;
    flex-wrap: wrap;
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #4c4c4c;
    border-radius: 7px;
    resize: none;
    overflow: hidden;
  }
`;

const Options = styled.div`
  margin-bottom: 7px;
  display: flex;
  justify-content: space-between;
`;

const EditDelete = styled.div`
  display: flex;
  justify-content: space-between;
  width: 35px;
  font-size: 12px;
`;
//
