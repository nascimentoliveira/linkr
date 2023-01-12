import axios from "axios";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroller';
import Navbar from "../components/Navbar.js";
import View from "../components/View.js";
import PostCard from "../components/PostCard.js";
import Sidebar from "../components/Sidebar.js";
import routes from "../constants.js";
import UserContext from "../contexts/userContext.js";
import Swal from "sweetalert2";
import { OvalSpinner } from '../components/Spinner.js';
import { POSTS_PER_PAGE } from '../constants.js';

export default function UserPosts() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [userPage, setUserPage] = useState({
    username: undefined,
    picture: undefined,
  });
  const [follows, setFollows] = useState();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [render, setRender] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const { id } = useParams();
  const { user, token } = useContext(UserContext);
  const myPage = user?.userId === Number(id);
  const { username, picture } = userPage;
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  function fetchData() {
    axios.get(`${routes.URL}/user/${id}?page=${pageNumber}&offset=${POSTS_PER_PAGE}`, config)
      .then(res => {
        if (res.data.posts.length < POSTS_PER_PAGE) {
          setHasMore(false);
        }
        setPosts([...posts, ...res.data.posts]);
        const { username, picture } = posts[0];
        setUserPage({ username, picture });
        setFollows(res.data.follows);
        setPageNumber(pageNumber + 1);
        setLoading(false);
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response?.data.message
        });
        setLoading(false);
      });
  }

  function follow() {
    setButtonDisabled(true);
    axios
      .get(`${routes.URL}/follow/${id}`, config)
      .then(setButtonDisabled(false), setFollows(true))
      .catch((err) =>
        Swal.fire({
          background: "#151515",
          icon: "error",
          title: "Oops...",
          text: err.response.data.message,
        })
      );
  }

  function unfollow() {
    setButtonDisabled(true);
    axios
      .delete(`${routes.URL}/follow/${id}`, config)
      .then(setButtonDisabled(false), setFollows(false))
      .catch((err) =>
        Swal.fire({
          background: "#151515",
          icon: "error",
          title: "Oops...",
          text: err.response.data.message,
        })
      );
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!token) {
      navigate('/');
      Swal.fire({
        position: 'center',
        background: '#151515',
        icon: 'warning',
        title: 'Please login with your account.',
        showConfirmButton: false,
        timer: 1200
      });
    } else {
      setLoading(true);
      setPosts([]);
      setHasMore(true);
      setPageNumber(0);
    }
  }, [render]);

  const loader =
    <Loading key={Math.random()}>
      <OvalSpinner />
      <p>Loading more posts</p>
    </Loading>;

  const noPosts =
    <Loading>
      <h6>There are no posts yet.</h6>
    </Loading>;

  const endMessage =
    <Loading>
      <h6>Yay! You have seen it all</h6>
    </Loading>;

  if (token) {
    return (
      <Container>
        <Navbar />
        <View>
          {loading ? <Header></Header> : (
            <Header>
              <div>
                <img src={picture} alt="user" />
                <h1>
                  {myPage ? "My posts" : username ? username + "`s posts" : null}
                </h1>
              </div>
              {myPage ? null : (
                <Button
                  follows={follows}
                  onClick={follows ? unfollow : follow}
                  disabled={buttonDisabled}
                >
                  {follows ? "Unfollow" : "Follow"}
                </Button>
              )}
            </Header>
          )}
          <section>
            <Posts>
              <InfiniteScroll
                loadMore={fetchData}
                hasMore={hasMore}
                loader={loader}
              >
                {
                  loading ? <></> :
                    (posts.length === 0 ?
                      noPosts :
                      posts.map((p) => <PostCard post={p} render={render} setRender={setRender} key={p.id} />)
                    )
                }
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
  font-family: 'Lato', sans-serif;
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
`;

const Header = styled.div`
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
