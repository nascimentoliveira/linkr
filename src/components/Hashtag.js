import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function Hashtag({ hashtag }) {
  return (
    <Link to={`/hashtag/${hashtag.hashtag}`}>
      <Container title={`View posts with #${hashtag.hashtag}`}>
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
  transition: all .5s;

  &:hover {
    transform: translate(7px);
    text-decoration: underline;
  }

`;