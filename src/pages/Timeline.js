import { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";

import UserContext from "../contexts/userContext.js";
import Navbar from "../components/Navbar.js";
import NewPublish from "../components/NewPublish.js";
import PostCard from "../components/PostCard.js";
import View from "../components/View.js";
import Sidebar from "../components/Sidebar.js";
import LoadMore from "../components/LoadMore.js";
import { OvalSpinner } from "../components/Spinner.js";
import { POSTS_PER_PAGE } from "../constants.js";

export default function Timeline() {
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date().toISOString());
  const [posts, setPosts] = useState([]);
  const [render, setRender] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [message, setMessage] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  function fetchData() {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/api/posts` +
        `?offset=${posts.length}&` +
        `more=${POSTS_PER_PAGE}`,
        config
      )
      .then((res) => {
        if (res.data.posts.length < POSTS_PER_PAGE) {
          setHasMore(false);
        }
        setPosts([...posts, ...res.data.posts]);
        setMessage(res.data.message);
        setPageNumber(pageNumber + 1);
        setLoading(false);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.message,
        });
        setLoading(false);
      });
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (!token) {
      navigate("/");
      Swal.fire({
        position: "center",
        background: "#151515",
        icon: "warning",
        title: "Please login with your account.",
        showConfirmButton: false,
        timer: 1200,
      });
    } else {
      setLoading(true);
      setPosts([]);
      setHasMore(true);
      setPageNumber(0);
    }
    setLastRefresh(new Date().toISOString());
  }, [render]);

  const loader = (
    <Loading key={0}>
      <OvalSpinner />
      <p>Loading more posts</p>
    </Loading>
  );

  const noPosts = (
    <Loading>
      <h6>{message}</h6>
    </Loading>
  );

  const endMessage = (
    <Loading>
      <h6>Yay! You have seen it all</h6>
    </Loading>
  );

  if (token) {
    return (
      <Container>
        <Navbar setRender={setRender} render={render} />
        <View>
          <h1>timeline</h1>
          <section>
            <Posts>
              <NewPublish setRender={setRender} render={render} />
              <LoadMore
                lastRefresh={lastRefresh}
                setLastRefresh={setLastRefresh}
                posts={posts}
                setPosts={setPosts}
              />
              <InfiniteScroll
                loadMore={fetchData}
                hasMore={hasMore}
                loader={loader}
              >
                {posts.map((p) => (
                  <PostCard
                    post={p}
                    render={render}
                    setRender={setRender}
                    key={p.id}
                  />
                ))}
              </InfiniteScroll>
              {loading ? (
                <></>
              ) : posts.length === 0 ? (
                noPosts
              ) : !hasMore ? (
                endMessage
              ) : (
                <></>
              )}
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
    color: #ffffff;
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
  color: #6d6d6d;
`;

const Posts = styled.div`
  max-width: 610px;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
