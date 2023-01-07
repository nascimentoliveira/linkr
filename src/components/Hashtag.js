import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function Hashtag({ hashtag }) {
  return (
    <Link to={`/hashtag/${hashtag.hashtag}`}>
      <Container>
        {'# ' + hashtag.hashtag}
      </Container>
    </Link>
  );
}

const Container = styled.li`
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  font-size: 19px;
  line-height: 23px;
  color: #FFFFFF;
  margin: 5px 0px;
`;