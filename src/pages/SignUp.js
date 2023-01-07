import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import axios from 'axios';

import Header from '../components/Header.js';
import ROUTES from '../constants.js';
import Spinner from '../components/Spinner.js';

export default function SignUp() {

  const [formEnabled, setFormEnabled] = useState(true);
  const [form, setForm] = useState({ 
    email: '', 
    password: '',
    username: '',
    picture: ''
   });

   function handleForm(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  const navigate = useNavigate();

  function signUp(e) {
    e.preventDefault();
    axios.post(ROUTES.SIGN_UP_ROUTE, form)
    .then(res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        background: '#151515',
        title: res.data.message,
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/signin');
    })
    .catch(err => {
      Swal.fire({
        icon: 'error',
        background: '#151515',
        title: 'Oops...',
        text: err.response.data.message
      });
      setForm({
        ...form,
        password: ''
      });
      setFormEnabled(true);
    });
  }

  return (
    <Container>
      <Header />
      <div className='right'>
        <form onSubmit={signUp}>
          <input
            type='email'
            name='email'
            placeholder='e-mail'
            value={form.email}
            onChange={handleForm}
            disabled={!formEnabled}
            required
            
          />
          <input
            type='password'
            name='password'
            placeholder='password'
            value={form.password}
            onChange={handleForm}
            disabled={!formEnabled}
            required
          />
          <input
            type='text'
            name='username'
            placeholder='username'
            value={form.username}
            onChange={handleForm}
            disabled={!formEnabled}
            required
          />
          <input
            type='text'
            name='picture'
            placeholder='picture'
            value={form.picture}
            onChange={handleForm}
            disabled={!formEnabled}
            required
          />
          <button 
            type='submit' 
            title={formEnabled ? 'Send' : 'Subscribing...'}
            disabled={!formEnabled}
          >
            {formEnabled ? <h3>Sign Up</h3> : <Spinner />}
          </button>
        </form>
        <div className='back'>
          <h1 onClick={() => navigate('/signin')}>Switch back to log in</h1>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #333333;
  display: flex;
  flex-direction: column;
  .back {
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
      font-family: 'Lato', sans-serif;
      font-weight: 400;
      font-size: 17px;
      line-height: 20px;
      text-decoration-line: underline;
      color: #ffffff;
      margin-top: 18px;
      &:hover {
          cursor: pointer;
      }
    }
  }

  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 40px;

    input {
      background-color: #ffffff;
      padding-left: 12px;
      width: 86%;
      height: 8vh;
      margin-bottom: 12px;
      border-radius: 6px;
      border: none;
      font-size: 22px;
      font-family: 'Oswald', sans-serif;
      font-weight: 700;
      font-size: 22px;
      line-height: 40px;

      &::placeholder {
        font-family: 'Oswald', sans-serif;
        font-weight: 700;
        font-size: 22px;
        line-height: 33px;
        color: #9f9f9f;
      }

      &:focus {
      outline: none;
      font-weight: 400;
      font-size: 27px;
      line-height: 33px;
      color: #474747;
      background-color: #FFFFFF;
    }
    
    &:disabled {
      color: #AFAFAF;
      background-color: #F2F2F2;
      -webkit-text-fill-color: #AFAFAF;
      -webkit-box-shadow: 0 0 0px 45px #F2F2F2 inset;
      box-shadow: 0 0 0px 45px #F2F2F2 inset;
    }
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1877f2;
    width: 86%;
    height: 8vh;
    border-radius: 6px;
    border: none;
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: #ffffff;
    font-weight: 700;
    font-size: 22px;
    line-height: 33px;
    cursor: pointer;
  }

  &:hover {
    filter: brightness(130%);
  }
}

@media only screen and (min-width: 768px) {
  flex-direction: row;
  form {
    width: 80%;
    input {
        width: 90%;
    }
    button {
        width: 90%;
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
  }
}
`;