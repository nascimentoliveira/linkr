import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import styled from 'styled-components';

import UserContext from '../contexts/userContext.js';

export default function Navbar() {

  const { user } = useContext(UserContext);
  const [showLogout, setshowLogout] = useState(false);
  const navigate = useNavigate();

  async function logout() {
    await (Swal.fire({
      position: 'center',
      background: '#151515',
      icon: 'question',
      title: 'Do you really want to exit the application?',
      showCancelButton: true,
      cancelButtonText: 'Not',
      confirmButtonText: 'Yes, I want to leave',
    })).then(result => {
      if (result.isConfirmed) {
        localStorage.removeItem('Linkr');
        navigate('/');
      } else {
        setshowLogout(false);
      }
    })
  }

  return (
    <Container>
      <Logo onClick={() => navigate('/timeline')}>linkr</Logo>
      <Profile
        title={showLogout ? 'Close options' : 'Show options'}
        onClick={() => setshowLogout(!showLogout)}
      >
        {showLogout ? <SlArrowUp /> : <SlArrowDown />}
        <img src={user.picture} alt={`${user.username} photo`} />
        {showLogout ?
          <Logout title='Logout' onClick={logout}>
            <button>Logout</button>
          </Logout>
          :
          <></>
        }
      </Profile>
      {showLogout ?
        <Close
          showLogout={showLogout}
          onClick={() => setshowLogout(!showLogout)}
        />
        :
        <></>
      }
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
  z-index: 2;
`;

const Logo = styled.span`
  font-family: 'Passion One', cursive;
  font-weight: 700;
  font-size: 49px;
  line-height: 54px;
  color: #FFFFFF;
  padding: 0px 10px;
  cursor: pointer;
`;

const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  img {
    width: 53px;
    height: 53px;
    border-radius: 26.5px;
  }

  svg {
    color: #FFFFFF;
    font-size: 20px;
    margin-right: 17px;
  }
`;

const Logout = styled.div`
  width: 150px;
  height: 47px;
  background-color: #171717;
  border-radius: 0px 0px 0px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 72px;
  right: 0px;
  z-index: 2;
  animation: entry 1s ease 0s 1 normal forwards;
  cursor: pointer;

  &:hover {
    filter: brightness(130%);
  }

  button {
    width: 100%;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    color: #FFFFFF;
    outline: none;
    border: none;
    background-color: transparent;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  }

  @keyframes entry {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Close = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  cursor: default;
`;