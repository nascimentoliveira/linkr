import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Swal from 'sweetalert2';

import ROUTES from '../constants.js';
import UserContext from '../contexts/userContext.js';
import Hashtag from './Hashtag.js';
import Spinner from './Spinner.js';

export default function Sidebar({ render, setRender }) {

  const { token } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [topHashtags, setTopHashtags] = useState([]);
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  async function fetchData() {
    setLoading(true);
    axios.get(ROUTES.HASTAGS_ROUTE, config)
      .then(res => {
        setTopHashtags(res.data);
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
  }, [render]);

  if (!token) {
    return;
  } else if (loading) {
    return (
      <Container>
        <h1>trending</h1>
        <hr />
        <HashtagsList load={loading}>
          <Spinner color='#333333' />
        </HashtagsList>
      </Container>
    );
  } else {
    return (
      <Container>
        <h1 title='Trending hashtags'>trending</h1>
        <hr />
        <HashtagsList load={loading}>
          {topHashtags.map(hashtag =>
            <Hashtag 
              key={hashtag.id}
              hashtag={hashtag} 
              render={render}
              setRender={setRender}
            />
          )}
        </HashtagsList>
      </Container>
    );
  }
}

const Container = styled.aside`
  width: 300px;
  height: fit-content;
  background: #171717;
  border-radius: 16px;
  cursor: default;
  position: sticky;
  position: -webkit-sticky;
  top: 120px;
  z-index: 2;

  h1 {
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: #FFFFFF;
    margin: 9px 18px;
  }

  hr {
    border: 1px solid #484848;
    margin: 0;
  }
`;

const HashtagsList = styled.ul`
  padding: 17px 16px;
  display: ${props => props.load ? 'flex' : 'default'};
  justify-content: ${props => props.load ? 'center' : 'default'};
  align-items: ${props => props.load ? 'center' : 'default'};
`;