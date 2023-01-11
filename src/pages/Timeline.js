import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import Swal from "sweetalert2";
import axios from 'axios';
import styled from 'styled-components';

import Navbar from '../components/Navbar.js';
import NewPublish from '../components/NewPublish.js';
import PostCard from '../components/PostCard.js';
import View from '../components/View.js';
import routes from '../constants.js';
import UserContext from '../contexts/userContext.js';
import Sidebar from '../components/Sidebar.js';
import Spinner from '../components/Spinner.js';

export default function Timeline() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [render, setRender] = useState(true);
  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  async function fetchData() {
    const { data } = await axios.get(routes.TIMELINE_ROUTE, config);
    setPosts(data);
    setLoading(false);
  }

  useEffect(() => {
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
      fetchData();
    }
  }, [render]);

  if (token) {
    return (
      <Container>
        <Navbar />
        <View>
          <h1>timeline</h1>
          <section>
            <Posts>
              <NewPublish setRender={setRender} render={render} />
              <InfiniteScroll
                pageStart={0}
                loadMore={fetchData}
                hasMore={true}
                loader={
                <Loading>
                  <Spinner color='#6D6D6D'/>
                  <p>Loading more posts</p>
                </Loading>}
              >
                {loading ? <></> : posts.length === 0 ? (
                  <h6>There are no posts yet.</h6>
                ) : (
                  posts.map((p) => <PostCard post={p} render={render} setRender={setRender} key={p.id} />)
                )}
              </InfiniteScroll>
            </Posts>
            <Sidebar render={render} />
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
    font-family: 'Oswald', sans-serif;
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
