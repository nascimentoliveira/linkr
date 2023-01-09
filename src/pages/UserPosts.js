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

export default function UserPosts() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState();
  const { id } = useParams();
  const { token } = useContext(UserContext);

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
    if (status === 204) {
      setLoading(false);
    } else {
    setPosts(data);
    setUsername(data[0].username);
    setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Navbar />
      <View>
        <h1>{loading ? null : username ? username + "`s posts" : null}</h1>
        <div>
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
        </div>
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
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #FFFFFF;
  }
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
`;

const Posts = styled.div`
  max-width: 610px;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
