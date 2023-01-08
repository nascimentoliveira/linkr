import { useEffect, useState, useContext } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import axios from 'axios';
import styled from 'styled-components';

import Navbar from '../components/Navbar.js';
import NewPublish from '../components/NewPublish.js';
import PostCard from '../components/PostCard.js';
import routes from '../constants.js';
import UserContext from '../contexts/userContext.js';
import Sidebar from '../components/Sidebar.js';

export default function Timeline() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [render, setRender] = useState(true)
  const { user, token } = useContext(UserContext);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  async function fetchData() {
    const { data } = await axios.get(routes.TIMELINE_ROUTE,config);
    setPosts(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [render]);

  return (
    <Container>
      <Navbar />
      <View>
        <h1>timeline</h1>
        <div>
          <Posts>
            <NewPublish setRender={setRender} render={render} />
            {loading ? (
              <Loading>
                <ThreeDots
                  height='100'
                  width='150'
                  radius='9'
                  color='#fff'
                  ariaLabel='three-dots-loading'
                  wrapperStyle={{}}
                  wrapperClassName=''
                  visible={true}
                />
              </Loading>
            ) : posts.length === 0 ? (
              <span>There are no posts yet.</span>
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
`;

const View = styled.main`
  padding-top: 60px;
  max-width: 950px;
  width: 100%;

  > h1 {
    padding: 43px 0px;
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #FFFFFF;
  }

  > div {
    display: flex;
    justify-content: space-between;
  }

  @media (max-width: 950px) {
    max-width: 610px;
    aside {
      display: none;
    }

  }

  @media (max-width: 610px) {
    padding-top: 72px;
    > h1 {
      padding: 19px 17px;
    }
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
