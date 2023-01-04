import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, resolvePath } from "react-router-dom";


export default function PostCard({ post }) {
  const { text, url, username, picture } = post;
  
  useEffect(() => {
    // urlMetadata(url)
    //   .then((metadata) => {
    //     console.log(metadata);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);

  return (
    <Container>
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
      </div>
    </Container>
  );
}

const Container = styled.section`
  width: 100%;
  min-height: 276px;
  border-radius: 16px;
  background-color: #171717;
  font-family: "Lato", sans-serif;
  font-weight: 400;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    margin-right: 20px;
  }
  > div {
    width: 503px;
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
    }
  }
`;
