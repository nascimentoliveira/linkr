import styled from "styled-components";

const View = styled.main`
  padding-top: 60px;
  max-width: 950px;
  width: 100%;
  > h1 {
    padding: 43px 0px;
    font-family: "Oswald", sans-serif;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #FFFFFF;
    word-break: break-all;
  }

  > section {
    display: flex;
    justify-content: space-between;
  }

  ::-webkit-scrollbar {
    width: 1px;
  }
  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background: #444;
    box-shadow: 0 0 1px 1px #111, inset 0 0 4px rgba(0,0,0,0.3);
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: linear-gradient(left, #3e3e3e, #111, #000);
    box-shadow: inset 0 0 1px 1px #646464;
  }

  @media (max-width: 950px) {
    max-width: 610px;
    aside {
      display: none;
    }

  }

  @media (max-width: 610px) {
    padding-top: 122px;
    > h1 {
      padding: 19px 17px;
    }
  }
`;

export default View;