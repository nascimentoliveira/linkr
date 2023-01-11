import axios from "axios";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar.js";
import View from "../components/View.js";
import PostCard from "../components/PostCard.js";
import Sidebar from "../components/Sidebar.js";
import routes from "../constants.js";
import UserContext from "../contexts/userContext.js";
import Swal from "sweetalert2";

export default function UserPosts() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [userPage, setUserPage] = useState({
    username: undefined,
    picture: undefined,
  });
  const [follows, setFollows] = useState();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { id } = useParams();
  const { user, token } = useContext(UserContext);
  const myPage = user.userId === Number(id);
  const { username, picture } = userPage;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  async function fetchData() {
    const { data, status } = await axios.get(
      `${routes.URL}/user/${id}`,
      config
    );
    const { posts, follows } = data;
    if (status === 204) {
      setLoading(false);
    } else {
      setPosts(posts);
      const { username, picture } = posts[0];
      setUserPage({ username, picture });
      setFollows(follows);
      setLoading(false);
    }
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
    fetchData();
  }, []);

  return (
    <Container>
      <Navbar />
      <View>
        {loading ? null : (
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
            {loading ? (
              <Loading>
                <ThreeDots
                  height="100"
                  width="150"
                  radius="9"
                  color="#fff"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              </Loading>
            ) : posts.length === 0 ? (
              <h6>There are no posts yet.</h6>
            ) : (
              posts.map((p) => <PostCard post={p} key={p.id} />)
            )}
          </Posts>
          <Sidebar />
        </section>
      </View>
    </Container>
  );
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
  justify-content: center;
  margin-top: 100px;
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
