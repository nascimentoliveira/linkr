

import styled from "styled-components";
import { useState } from "react";

import Left from "./Left";
import Right from "./Right";
import Comments from "./Comments";

export default function Post({ post, render, setRender }) {

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments);
  const postStates = {
    render,
    setRender,
    showComments,
    setShowComments,
    comments, 
    setComments,
  };

  return (
    <PostStyled>
      <Box>
        <Left
          postId={post.id}
          userId={post.userId}
          postUserPicture={post.picture}
          postLikes={post.likes}
          postLiked={post.liked}
          postLikers={post.likers}
          postStates={postStates}

        />
        <Right
          postId={post.id}
          postUserId={post.userId}
          postUsername={post.username}
          postText={post.text}
          postLink={post.link}
          postStates={postStates}
        />
      </Box>
      <Box>
        <Comments
          postId={post.id}
          postStates={postStates}
        />
      </Box>
    </PostStyled>
  );
}

const PostStyled = styled.section`
  width: 100%;
  height: auto;
  border-radius: 16px;
  background-color: #171717;
  font-family: "Lato", sans-serif;
  font-weight: 400;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 20px 20px 5px;
  position: relative;
  h1 {
    color: white;
    font-size: 19px;
  }
  h2 {
    color: #b7b7b7;
    font-size: 17px;
    margin-bottom: 7px;
  }
  @media (max-width: 610px) {
    border-radius: 0px;
    margin-top: 15px;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
`;
//
