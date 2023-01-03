import styled from 'styled-components';
import { SlArrowDown } from 'react-icons/sl';

export default function Navbar() {
  return (
    <Container>
      <Logo>linkr</Logo>
      <Profile>
        <button><SlArrowDown /></button>
        <img alt='User picture'/>
      </Profile>
    </Container>
  );
}

const Container = styled.nav`
  width: 100%;
  height: 72px;
  background-color: #151515;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 18px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Logo = styled.span`
  font-family: 'Passion One', cursive;
  font-weight: 700;
  font-size: 49px;
  line-height: 54px;
  color: #FFFFFF;
  padding: 0px 10px;
`;

const Profile = styled.div`
  display: flex;
  justify-content: center;

  button {
    background-color: transparent;
    outline: none;
    border: none;
    cursor: pointer;
  }

  img {
    width: 53px;
    height: 53px;
    border-radius: 26.5px;
    background-color: #FFFFFF;
  }

  svg {
    color: #FFFFFF;
    font-size: 20px;
  }

`;