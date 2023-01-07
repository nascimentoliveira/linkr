import axios from "axios";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar.js";
import View from "../components/View.js";
import PostCard from "../components/PostCard.js";
import routes from "../constants.js";
import UserContext from "../contexts/userContext.js";

export default function UserPosts() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState();
  const { id } = useParams();
  const {user,token} = useContext(UserContext);


  async function fetchData() {
    const { data, status } = await axios.get(`${routes.URL}/user/${id}`);
    if (status === 204) {
      setLoading(false);
    }
    setPosts(data);
    setUsername(data[0].username);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <View>
        <span>{loading ? null : username ? username + "`s posts" : null}</span>
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
          <span>There are no posts yet.</span>
        ) : (
          posts.map((p) => <PostCard post={p} key={p.id} />)
        )}
      </View>
    </>
  );
}

const Loading = styled.div`
  display: flex;
  justify-content: center;
`;
