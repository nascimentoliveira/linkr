import Navbar from "../components/Navbar.js";
import View from "../components/View.js";
import NewPublish from "../components/NewPublish.js";
import PostCard from "../components/PostCard.js";
import { useEffect,useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";

export default function Timeline() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  async function fetchData() {
    const { data } = await axios.get("http://localhost:4000/timeline");
    setPosts(data);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      <View>
        <span>timeline</span>
        <NewPublish />
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
        ) : (
          posts.map((p) => <PostCard post={p} key={p.id} />)
        )}
        {/* <PostCard />
        <PostCard /* dupliquei um postcard só para testar o scroll 
                  da timeline enquanto o post ainda está estático */
        /> */}
      </View>
    </>
  );
}

const Loading = styled.div`
  display: flex;
  justify-content: center;
`;
