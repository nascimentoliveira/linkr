import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import ROUTES from '../constants.js';
import View from '../components/View.js';
import Navbar from '../components/Navbar.js';
import Spinner from '../components/Spinner.js';
import Sidebar from '../components/Sidebar.js';
import UserContext from '../contexts/userContext.js';
import PostCard from '../components/PostCard.js';

export default function Hashtag() {

  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState(true);
  const [posts, setPosts] = useState([]);
  const { token } = useContext(UserContext);
  const hashtag = useParams();
  const navigate = useNavigate();

  async function fetchData() {
    setLoading(true);
    axios.get(`${ROUTES.HASTAGS_ROUTE}/${hashtag.hashtag}`, config)
      .then(res => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message
        });
        setLoading(false);
      });
  }

  useEffect(() => {
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
      fetchData();
    }
  }, [hashtag]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  if (!token) {
    return;
  } else if (loading) {
    return (
      <Container>
        <Navbar />
        <View>
          <h1>{'# ' + hashtag.hashtag}</h1>
          <div>
            <Posts>
              <Spinner color='#FFFFFF' size='80' />
            </Posts>
            <Sidebar render={render} />
          </div>
        </View>
      </Container>
    );
  } else {
    return (
      <Container>
        <Navbar />
        <View>
          <h1>{'# ' + hashtag.hashtag}</h1>
          <section>
            <Posts>
              {posts?.map(post =>
                <PostCard post={post} key={post.id} />
              )}
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
`;

const Posts = styled.div`
  max-width: 610px;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;