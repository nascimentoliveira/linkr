import { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Swal from 'sweetalert2';

import ROUTES from '../constants';
import UserContext from '../contexts/userContext.js';
import Hashtag from './Hashtag';
import Spinner from './Spinner';

export default function Sidebar() {

  const { token } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [topHashtags, setTopHashtags] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {
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
  }, []);

  if (loading) {
    return (
      <Container>
        <h1>trending</h1>
        <hr />
        <HashtagsList loading={loading}>
          <Spinner color='#333333'/>
        </HashtagsList>
      </Container>
    );
  } else {
    return (
      <Container>
        <h1>trending</h1>
        <hr />
        <HashtagsList loading={loading}>
          {topHashtags.map(hashtag =>
            <Hashtag hashtag={hashtag} key={hashtag.id} />
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
  display: ${props => props.loading ? 'flex' : 'default'};
  justify-content: ${props => props.loading ? 'center' : 'default'};
  align-items: ${props => props.loading ? 'center' : 'default'};
`;
