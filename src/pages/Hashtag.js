import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import ROUTES from '../constants.js';
import View from '../components/View.js';
import Navbar from '../components/Navbar.js';
import Sidebar from '../components/Sidebar.js';
import UserContext from '../contexts/userContext.js';
import PostCard from '../components/PostCard.js';
import { OvalSpinner } from '../components/Spinner.js';
import { POSTS_PER_PAGE } from '../constants.js';

export default function Hashtag() {

  const hashtag = useParams();
  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState(true);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const { token } = useContext(UserContext);
  
  const navigate = useNavigate();

  function fetchData() {
    axios.get(`${ROUTES.HASTAGS_ROUTE}/${hashtag.hashtag}?page=${pageNumber}&offset=${POSTS_PER_PAGE}`, config)
      .then(res => {
        if (res.data.length < POSTS_PER_PAGE) {
          setHasMore(false);
        }
        setPosts([...posts, ...res.data]);
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

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!token) {
      Swal.fire({
        position: 'center',
        background: '#151515',
        icon: 'warning',
        title: 'Please login with your account.',
        showConfirmButton: false,
        timer: 1200
      });
      navigate('/');
    } else {
      setLoading(true);
      setPosts([]);
      setHasMore(true);
      setPageNumber(0);
    }
  }, [render]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

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

  if (!token) {
    return;
  } else {
    return (
      <Container>
        <Navbar />
        <View>
          <h1>{'# ' + hashtag.hashtag}</h1>
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
  align-items: center;
`;