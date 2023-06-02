import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import { useContext, useState } from "react";

import UserContext from "../contexts/userContext";

export default function UserHeader({ header, loading }) {
  const { username, picture, id, follows } = header
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { user, token } = useContext(UserContext);
  const myPage = user?.userId === Number(id);
  const [followSwitch, setFollowSwitch] = useState(follows);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  function follow() {
    setButtonDisabled(true);
    console.log(config)
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/followers/${id}`, {}, config)
      .then((res) => {
        setButtonDisabled(false);
        setFollowSwitch(true);
      })
      .catch((err) => {
        Swal.fire({
          background: "#151515",
          icon: "error",
          title: "Oops...",
          text: err.response.data.error,
        });
      });
  }

  function unfollow() {
    setButtonDisabled(true);
    axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/followers/${id}`, config)
      .then((res) => {
        setButtonDisabled(false);
        setFollowSwitch(false)
      })
      .catch((err) => {
        Swal.fire({
          background: "#151515",
          icon: "error",
          title: "Oops...",
          text: err.response.data.error,
        });
      });
  }
  return (
    <Container>
      <div>
        <img src={picture} alt="user" />
        <h1>{myPage ? "My posts" : username ? username + "`s posts" : null}</h1>
      </div>
      {myPage ? null : (
        <Button
          follows={followSwitch}
          onClick={followSwitch ? unfollow : follow}
          disabled={buttonDisabled}
        >
          {followSwitch ? "Unfollow" : "Follow"}
        </Button>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 10px;
  > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 80%;
    padding-left: 20px;
  }
  img {
    width: 53px;
    height: 53px;
    border-radius: 26.5px;
    object-fit: cover;
    margin-right: 20px;
  }
  h1 {
    padding: 43px 0px;
    font-family: "Oswald", sans-serif;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #ffffff;
  }
  @media (max-width: 610px) {
    margin: 0;
  }
`;

const Button = styled.button`
  width: 112px;
  height: 31px;
  background-color: ${(props) => (props.follows ? "#FFFFFF" : "#1877F2")};
  border-radius: 5px;
  font-family: "Lato", sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: ${(props) => (props.follows ? "#1877F2" : "#FFFFFF")};
  border: none;
  outline: none;
  cursor: pointer;
  margin-right: 7px;
  &:hover {
    filter: brightness(130%);
  }
  &:disabled {
    filter: grayscale(60%);
    cursor: default;
  }
`;
//
