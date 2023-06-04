import { useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import Swal from "sweetalert2";

import UserContext from "../../contexts/userContext";
import { IoPaperPlaneOutline } from "react-icons/io5"
import Comment from "./Comment";

export default function Comments({ postId, postStates }) {
  const { user, token } = useContext(UserContext);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  function sendComment(e, postId) {
    e.preventDefault();
    setLoading(true);
    const body = {
      comment: newComment,
    }
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/comments/${postId}`, body, config)
      .then((res) => {
        Swal.fire({
          position: "center",
          background: "#151515",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1000,
        });
        setLoading(false);
        setNewComment("");
        postStates.setComments(res.data.comments)
        setLoading(false);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error,
        });
        setLoading(false);
      });
  }
  return (
    <Container showComments={postStates.showComments}>
      <div>
        {postStates.comments.map((comment) => (
          <Comment
            key={comment.id}
            userId={comment.userId}
            picture={comment.picture}
            username={comment.username}
            isAuthor={comment.isAuthor}
            follow={comment.follow}
            comment={comment.comment}
          />
        ))}
      </div>
      <NewComment onSubmit={(event) => { sendComment(event, postId) }}>
        <img src={user.picture} alt="" />
        <input
          type="text"
          placeholder="write a comment..."
          onChange={(e) => setNewComment(e.target.value)}
          value={newComment}
          disabled={loading}
          required
        />
        <button disabled={loading}>
          <IoPaperPlaneOutline color="#fff" size={18} />
        </button>
      </NewComment>
    </Container>
  );
};

const Container = styled.div`
  display:${props => props.showComments ? "flex" : "none"};
  flex-direction: column;
  width: 100%;
  background-color: #1E1E1E;
  padding: 13px 25px;
  padding-bottom: 25px;
  border-radius: 16px;
  box-sizing: border-box;
  padding-top: 10px;
  margin-left: 10px;
  img {
    width: 45px;
    border-radius: 50%;
  }
`;

const NewComment = styled.form`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-top: 23px;
  input {
    color: white;
    box-sizing: border-box;
    padding: 10px;
    background-color: #252525;
    width: 90%;
    height: 40px;
    border: none;
    border-radius: 8px;
    ::placeholder{
        font-style: italic;
    }
    :disabled{
        opacity: 30%;
    }
  }
  button {
    background-color: transparent;
    border: none;
    position: absolute;
    right: 10px;
    top: 9px;
    :disabled{
        opacity: 30%;
    }
  }
`;
//
