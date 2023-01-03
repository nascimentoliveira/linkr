import styled from 'styled-components';

const View = styled.main`
  max-width: 610px;
  width: 100%;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 60px;
  cursor: default;

  > span {
    padding: 43px 0px;
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #FFFFFF;
  }

  @media (max-width: 610px) {
    padding-top: 72px;
    > span {
      padding: 19px 17px;
    }
  }
`;

export default View;