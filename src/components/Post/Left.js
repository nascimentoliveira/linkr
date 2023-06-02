import { useNavigate } from "react-router";
import styled from "styled-components";
import { AiOutlineComment } from "react-icons/ai"

import Likes from "./Likes";

export default function Left({ postId, userId, postUserPicture, postLikes, postLiked, postLikers, postComments, postStates }) {
  const navigate = useNavigate();
  return (
    <LeftStyled>
      <img
        src={postUserPicture}
        alt="User"
        onClick={() => navigate(`/users/${userId}`)}
      />
      <Likes
        postId={postId}
        postLikes={postLikes}
        postLiked={postLiked}
        postLikers={postLikers}
      />
      <CommentsButton
        onClick={() => postStates.setShowComments(!postStates.showComments)}>
        <AiOutlineComment color="#fff" size={30} />
        <span>{postComments} {postComments.length > 1 ? "comments" : "comment"}</span>
      </CommentsButton>
    </LeftStyled>
  );
}

const LeftStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #c0c0c0;
  font-size: 22px;
  font-weight: 900;
  margin-bottom: ${props => props.comments ? "0px" : "140px"};
  img {
    width: 53px;
    height: 53px;
    border-radius: 26.5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    object-fit: cover;
    cursor: pointer;
  }
  p {
    font-size: 10px;
  }
`;

const CommentsButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  margin-top: 20px;
  border: none;
  background: none;
  cursor: pointer;
  span {
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    text-align: center;
    color: #FFFFFF;
  }
`;
//
