import axios from "axios";
import styled from "styled-components";
import { useEffect, useState,useContext } from "react";
import UserContext from "../contexts/userContext.js";
import { ThreeDots } from "react-loader-spinner";
import Navbar from "../components/Navbar.js";
import View from "../components/View.js";
import NewPublish from "../components/NewPublish.js";
import PostCard from "../components/PostCard.js";
import routes from "../constants.js";

export default function Timeline() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [render,setRender] = useState(true)
  const { user, token } = useContext(UserContext);


  async function fetchData() {
    const { data } = await axios.get(routes.TIMELINE_ROUTE);
    setPosts(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [render]);

  return (
    <>
      <Navbar />
      <View>
        <span>timeline</span>
        <NewPublish setRender={setRender} render={render}/>
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
