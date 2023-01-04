/* eslint-disable jsx-a11y/img-redundant-alt */

import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, resolvePath } from "react-router-dom";


export default function PostCard({ post }) {
  const { text, url, username, picture } = post;
  import { useState } from "react";
import { TiHeartFullOutline } from "react-icons/ti";


  useEffect(() => {
    // urlMetadata(url)
    //   .then((metadata) => {
    //     console.log(metadata);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);

  const [selecionado, setSelecionado] = useState(false);
  const red = "#AC0000";
  const white = "#C0C0C0";

  return (
    <Container>
      <Left>
        <img
          src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
          alt="User"
        />
        <Likes>
          <HeartIcon onClick={() => setSelecionado(!selecionado)} color={selecionado === false ?  white : red}>
            <TiHeartFullOutline></TiHeartFullOutline>
          </HeartIcon>
          <p> xx likes </p>
        </Likes>
      </Left>

      <Infos>
        <h1>Fulano</h1>
        <h2>
          Muito maneiro esse tutorial de Material UI com React, deem uma olhada!
        </h2>
        <Link>
      <img src={picture} alt="User" />
      <div>
        <h1>{username}</h1>
        <h2>{text}</h2>
        <UrlBox>
          <div>
            <h3>Como aplicar o Material UI em um projeto React</h3>
            <p>
              Hey! I have moved this tutorial to my personal blog. Same content,
              new location. Sorry about making you click through to another
              page.
            </p>
            <h4>https://medium.com/@pshrmn/a-simple-react-router</h4>
          </div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOEIXpZcXR-N8OH_q0Dj2ou6Vr1U69t4kM-w&usqp=CAU"
            alt="Url Image"
          />
        </UrlBox>
      </Infos>
    </Container>
  );
}

const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #C0C0C0;
  font-size: 22px;
  font-weight: 900;
  margin-bottom: 140px;

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

const Likes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  justify-content: center;
`;

const HeartIcon = styled.div`
  font-size: 26px;
  color: ${props => props.color};
  margin-top: 15px;
  margin-bottom: 4px;
  cursor: pointer;
`;

const Infos = styled.div`
  margin-left: 8px;
  margin-top: 5px;
`;

const Container = styled.section`
  width: 100%;
  min-height: 276px;
  border-radius: 16px;
  background-color: #171717;
  font-family: "Lato", sans-serif;
  font-weight: 400;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  padding: 20px;

  h1 {
    color: white;
    font-size: 19px;
    margin-bottom: 7px;
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

const UrlBox = styled.button`
  width: 100%;
  height: 70%;
  border-radius: 11px;
  border: 1px solid #4d4d4d;
  background-color: #171717;
  display: flex;
  justify-content: space-between;
  padding: 0;
  img {
    height: 100%;
    width: 30%;
    margin: 0;
    border-radius: 0px 11px 11px 0px;
  }
  div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    text-align: left;
    align-items: flex-start;
    justify-content: space-between;
    padding: 5%;
    h3 {
      font-size: 16px;
      color: #cecece;
    }
    p {
      font-size: 11px;
      color: #9b9595;
    }
    h4 {
      color: #cecece;
      font-size: 11px;
      line-height: 13.2px;
    h4 {
      color: #cecece;
      font-size: 11px;
      line-height: 13.2px;
    }
  }
`;
