import styled from 'styled-components';

const View = styled.main`
  max-width: 611px;
  width: 100%;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 105px;
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;
  color: #FFFFFF;
  cursor: default;

  @media (max-width: 768px) {
    padding-left: 17px;
  }
`;

export default View;