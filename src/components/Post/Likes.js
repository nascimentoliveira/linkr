import axios from "axios";
import Swal from "sweetalert2";
import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { TiHeartFullOutline } from "react-icons/ti";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import UserContext from "../../contexts/userContext";

export default function Likes({ postId, postLikes, postLiked, postLikers }) {
  const { user, token } = useContext(UserContext);
  const [likes, setLikes] = useState(parseInt(postLikes));
  const [liked, setLiked] = useState(postLiked);
  const [likers, setLikers] = useState(postLikers);
  const [loading, setLoading] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState(null);
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if (likes === 0) {
      setTooltipMessage(null);
    } else if (likes === 1) {
      if (liked) setTooltipMessage(`You liked`);
      else setTooltipMessage(`Liked by ${likers[0]}`);
    } else if (likes === 2) {
      if (liked) setTooltipMessage(`You and ${likers[0]} liked`);
      else setTooltipMessage(`${likers[0]} and ${likers[1]} liked`);
    } else {
      if (liked) setTooltipMessage(`You, ${likers[0]} and other ${likes - 2} people liked`);
      else setTooltipMessage(`${likers[0]}, ${likers[1]} and other ${likes - 2} people liked`);
    }
  }, [likes, liked, likers, user.id]);

  function like(postId) {
    setLoading(true);
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/likes/${postId}`, {}, config)
      .then((res) => {
        Swal.fire({
          position: "center",
          background: "#151515",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1000,
        });
        setLikes(parseInt(res.data.likes));
        setLiked(res.data.liked);
        setLikers(res.data.likers);
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

  function dislike(postId) {
    setLoading(true);
    axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/likes/${postId}`, config)
      .then((res) => {
        Swal.fire({
          position: "center",
          background: "#151515",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1000,
        });
        setLikes(parseInt(res.data.likes));
        setLiked(res.data.liked);
        setLikers(res.data.likers);
        setLoading(false);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error
        });
        setLoading(false);
      });
  }

  return (
    <LikesStyled>
      <HeartIcon
        onClick={() => liked ? dislike(postId) : like(postId)}
        color={liked ? "#AC0000" : "#C0C0C0"}
        disabled={loading}
      >
        <TiHeartFullOutline />
      </HeartIcon>
      <TooltipMessage
        className="my-anchor-element"
        data-tooltip-content={tooltipMessage}
      >
        {likes} {likes > 1 ? "likes" : "like"}
      </TooltipMessage>
      <Tooltip
        anchorSelect=".my-anchor-element"
        place="top"
        style={{ color: "white", fontSize: "12px" }}
      />
    </LikesStyled>
  );
}

const LikesStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  justify-content: center;
`;

const TooltipMessage = styled.a`
  margin-top: 10px;
  font-size: 12px;
  cursor: pointer;
`;

const HeartIcon = styled.button`
  font-size: 26px;
  color: ${(props) => props.color};
  margin-top: 15px;
  margin-bottom: -10px;
  border: none;
  background: none;
  cursor: pointer;
`;
//
