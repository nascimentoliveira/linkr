import axios from "axios";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import Navbar from "../components/Navbar.js";
import View from "../components/View.js";
import PostCard from "../components/PostCard.js";
import Sidebar from "../components/Sidebar.js";
import routes from "../constants.js";
import UserContext from "../contexts/userContext.js";
import Swal from "sweetalert2";
import { OvalSpinner } from "../components/Spinner.js";
import { POSTS_PER_PAGE } from "../constants.js";
import UserHeader from "../components/UserHeader.js";

export default function UserPosts() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [render, setRender] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [header, setHeader] = useState({ username: "", picture: "", id: null });
  const { id } = useParams();
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
        `${routes.URL}/user/${id}?page=${pageNumber}&offset=${POSTS_PER_PAGE}`,
        config
      )
      .then((res) => {
        if (res.data.posts.length < POSTS_PER_PAGE) {
          setHasMore(false);
        }
        setHeader(res.data.header);
        setPosts([...posts, ...res.data.posts]);
        setPageNumber(pageNumber + 1);
        setLoading(false);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response?.data.message,
        });
        setLoading(false);
      });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
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
  }, [render]);

  const loader = (
    <Loading key={Math.random()}>
      <OvalSpinner />
      <p>Loading more posts</p>
    </Loading>
  );

  const noPosts = (
    <Loading>
      <h6>There are no posts yet.</h6>
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
        <Navbar setRender={setRender} render={render}/>
        <View>
          {loading ? <LoadHeader></LoadHeader> : <UserHeader header={header} />}
          <section>
            <Posts>
              <InfiniteScroll
                loadMore={fetchData}
                hasMore={hasMore}
                loader={loader}
              >
                {loading ? (
                  <></>
                ) : posts.length === 0 ? (
                  noPosts
                ) : (
                  posts.map((p) => (
                    <PostCard
                      post={p}
                      render={render}
                      setRender={setRender}
                      key={p.id}
                    />
                  ))
                )}
              </InfiniteScroll>
              {hasMore ? <></> : endMessage}
            </Posts>
            <Sidebar />
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

const LoadHeader = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  height: 150px;
`
