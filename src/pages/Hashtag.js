import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import axios from "axios";
import styled from "styled-components";
import Swal from "sweetalert2";

import UserContext from "../contexts/userContext.js";
import View from "../components/View.js";
import Navbar from "../components/Navbar.js";
import Sidebar from "../components/Sidebar.js";
import Post from "../components/Post/Post.js";
import { OvalSpinner } from "../components/Spinner.js";
import { POSTS_PER_PAGE } from "../constants.js";

export default function Hashtag() {
  const navigate = useNavigate();
  const hashtag = useParams();
  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState(true);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const { token } = useContext(UserContext);

  function getHashtagsPosts() {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/hashtags/${hashtag.hashtag}?&offset=${posts.length}&more=${POSTS_PER_PAGE}`, config)
      .then(res => {
        if (res.data.posts.length < POSTS_PER_PAGE) {
          setHasMore(false);
        }
        setPosts([...posts, ...res.data.posts]);
        setLoading(false);
      })
      .catch(err => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error
        });
        setLoading(false);
      });
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (!token) {
      Swal.fire({
        position: "center",
        background: "#151515",
        icon: "warning",
        title: "Please login with your account.",
        showConfirmButton: false,
        timer: 1200
      });
      navigate("/");
    } else {
      setLoading(true);
      setPosts([]);
      setHasMore(true);
    }
  }, [render]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const loader =
    <Loading key={0}>
      <OvalSpinner />
      <p>Loading more posts</p>
    </Loading>;

  const finalMessage = () => {
    if (loading) {
      return <></>;
    }
    if (posts.length === 0) {
      return (
        <Loading>
          <h6>There are no posts yet.</h6>
        </Loading>
      );
    }
    if (!hasMore) {
      return (
        <Loading>
          <h6>Yay! You have seen it all</h6>
        </Loading>
      );
    }
  }

  if (!token) {
    return;
  } else {
    return (
      <Container>
        <Navbar setRender={setRender} render={render} />
        <View>
          <h1>{"# " + hashtag.hashtag}</h1>
          <section>
            <Posts>
              <InfiniteScroll
                loadMore={getHashtagsPosts}
                hasMore={hasMore}
                loader={loader}
              >
                {posts.map((post) => (
                  <Post
                    post={post}
                    render={render}
                    setRender={setRender}
                    key={post.id}
                  />
                ))}
              </InfiniteScroll>
              {finalMessage()}
            </Posts>
            <Sidebar render={render} setRender={setRender} />
          </section>
        </View>
      </Container>
    );
  }
}

const Container = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h6 {
    padding: 43px 0px;
    font-family: "Oswald", sans-serif;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #FFFFFF;
  }
`;

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 100px;
  font-family: "Lato", sans-serif;
  font-weight: 400;
  font-size: 22px;
  line-height: 26px;
  color: #6D6D6D;
`;

const Posts = styled.div`
  max-width: 610px;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
//
