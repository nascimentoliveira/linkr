import styled from 'styled-components';

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

export default View;