/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */

import styled from "styled-components";
import axios from "axios";
import routes from "../constants";
import { useState, useEffect } from "react";
import { TiHeartFullOutline } from "react-icons/ti";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function PostCard({ post }) {
  const { id, text, url, username, picture, title, description, image } = post;
  const [selecionado, setSelecionado] = useState(false);
  const [countLikes, setCountLikes] = useState(0);
  const [allLikes, setAllLikes] = useState([]);
  const [namesLike, setNamesLike] = useState([]);
  const [result, setResult] = useState("");

  const red = "#AC0000";
  const white = "#C0C0C0";

  useEffect(() => {
    const promise = axios.get(`${routes.URL}/likes`);

    promise.then(({ data }) => {
      setAllLikes(data);
    });

    promise.catch((e) => {
      console.error(e.data);
    });
  }, []);

  let likesFilter = allLikes.find(
    (like) => like.postId === id && like.userId === 2
  );

  useEffect(() => {
    if (likesFilter) {
      setSelecionado(true);
    } else {
      setSelecionado(false);
    }
  }, [likesFilter]);

  useEffect(() => {
    const postId = id;
    const promise = axios.get(`${routes.URL}/likes/count/${postId}`);

    promise.then(({ data }) => {
      setCountLikes(data);
    });

    promise.catch((e) => {
      console.error(e.data);
    });
  }, [selecionado]);

  useEffect(() => {
    const postId = id;
    const promise = axios.get(`${routes.URL}/likes/${postId}`);

    promise.then(({ data }) => {
      setNamesLike(data);
      console.log(namesLike);
    });

    promise.catch((e) => {
      console.error(e.data);
    });
  }, [countLikes]);

  useEffect(() => {
    let getName = [];
    for (let i = 0; i < namesLike.length; i++) {
      getName.push(namesLike[i].username);
    }

    let res = "";
    if (namesLike.length === 0) {
      res = null;
      setResult(res);
    } else if (namesLike.length === 1 && selecionado) {
      res = "You liked";
      setResult(res);
    } else if (getName.length === 1 && !selecionado) {
      res = `Liked by ${getName[0]}`;
      setResult(res);
    } else if (namesLike.length === 2 && selecionado) {
      res = `You and ${getName[0]} liked`;
      setResult(res);
    } else if (getName.length === 2 && !selecionado) {
      res = `${getName[0]} e ${getName[1]} liked`;
      setResult(res);
    } else if (namesLike.length >= 3 && selecionado) {
      res = `You, ${getName[0]} and other ${countLikes - 2} people liked`;
      setResult(res);
    } else if (getName.length >= 3 && !selecionado) {
      res = `${getName[0]}, ${getName[1]} and other ${
        countLikes - 2
      } people liked`;
      setResult(res);
    }
  }, [namesLike]);

  function like(postId) {
    const promise = axios.post(`${routes.URL}/likes/${postId}`, postId);
    promise.then(() => {
      setSelecionado(true);
    });
    promise.catch((e) => {
      console.error(e);
    });
  }

  function dislike(postId) {
    const promise = axios.delete(`${routes.URL}/dislikes/${postId}`);
    promise.then(() => {
      setSelecionado(false);
    });
    promise.catch((e) => {
      console.error(e);
    });
  }

  function openInNewTab(url) {
    window.open(url);
  }

  return (
    <>
      <Container>
        <Left>
          <img src={picture} alt="User" />
          <Likes>
            <HeartIcon
              onClick={() => {
                if (selecionado === false) {
                  like(id);
                } else if (selecionado === true) {
                  dislike(id);
                }
              }}
              color={selecionado === false ? white : red}
            >
              <TiHeartFullOutline></TiHeartFullOutline>
            </HeartIcon>
            <a id="custom-inline-styles"> {countLikes} likes </a>
            <Tooltip
              anchorId="custom-inline-styles"
              place="bottom"
              style={{ color: "white", fontSize: "12px" }}
              content={countLikes ? `${result}` : null}
            />
          </Likes>
        </Left>

        <Infos>
          <h1>{username}</h1>
          <h2>{text}</h2>
          <UrlBox onClick={(e) => openInNewTab(url)}>
            <UrlInfos>
              <h3>{title}</h3>
              <p>{description}</p>
              <h4>{url}</h4>
            </UrlInfos>
            <img src={image} alt="Url Image" />
          </UrlBox>
        </Infos>
      </Container>
    </>
  );
}

const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #c0c0c0;
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

  a {
    font-size: 12px;
  }
`;

const HeartIcon = styled.div`
  font-size: 26px;
  color: ${(props) => props.color};
  margin-top: 15px;
  margin-bottom: 4px;
  cursor: pointer;
`;

const Infos = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  word-wrap: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
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
  padding: 20px 20px 20px 5px;

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
  /* width: 100%; */
  height: 60%;
  border-radius: 11px;
  border: 1px solid #4d4d4d;
  background-color: #171717;
  display: flex;
  justify-content: space-between;
  padding: 0;
  cursor: pointer;

  img {
    height: 100%;
    width: 30%;
    margin: 0;
    border-radius: 0px 11px 11px 0px;
    object-fit: cover;
  }
`;

const UrlInfos = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  align-items: flex-start;
  justify-content: space-around;
  padding: 2%;

  position: relative;
  h3 {
    font-size: 16px;
    color: #cecece;
  }
  p {
    font-size: 11px;
    color: #9b9595;
    white-space: wrap;

    max-width: 100%;
    overflow: hidden;
  }
  > h4 {
    color: #cecece;
    font-size: 11px;
    line-height: 13.2px;
  }
`;
