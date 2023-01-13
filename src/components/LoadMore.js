import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { BiRefresh } from 'react-icons/bi';
import Swal from 'sweetalert2';
import axios from 'axios';
import styled from 'styled-components';
import useInterval from 'use-interval';

import UserContext from '../contexts/userContext.js';
import ROUTES from '../constants.js';

export default function LoadMore({ lastRefresh, setLastRefresh, posts, setPosts }) {
  const [newPosts, setNewPosts] = useState([]);
  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

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
    }
  }, []);

  useInterval(() => {
    axios.get(
      `${ROUTES.TIMELINE_ROUTE}/`+
      `?lastRefresh=${lastRefresh}`,
      config
    ).then(res => {
      setNewPosts(res.data.posts);
    })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message
        });
      });
  }, 15000);

  return (
    newPosts?.length > 0 ?
      <Container onClick={() => {
        setPosts([...newPosts, ...posts]);
        setNewPosts([]);
        setLastRefresh(new Date().toISOString());
        window.scrollTo({ top: 250, behavior: 'smooth' });
      }}>
        {`${newPosts.length} new posts, load more!`}
        <BiRefresh />
      </Container>
      :
      <></>
  );
}

const Container = styled.button`
  max-width: 610px;
  width: 100%;  
  height: 61px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1877F2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #FFFFFF;
  border: none;
  outline: none;
  margin: 0px auto 17px;
  transition: all .5s;
  position: sticky;
  position: -webkit-sticky;
  top: 80px;
  z-index: 2;

  @media (max-width: 610px) {
    width: 95%;  
    top: 135px;
  }

  &:hover {
    filter: brightness(150%);
  }

  > svg {
    font-size: 28px;
    margin: 0px 14px;
  }
`;