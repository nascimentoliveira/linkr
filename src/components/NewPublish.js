import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Swal from 'sweetalert2';

import ROUTES from '../constants';

export default function NewPublish() {

  const [formEnabled, setFormEnabled] = useState(true);
  const [form, setForm] = useState({ url: '', text: '' });

  function handleForm(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function newPost(e) {
    e.preventDefault();
    setFormEnabled(false);
    
    if (!form.text) {
      delete form.text;
    }

    axios.post(ROUTES.POSTS_ROUTE, form)
      .then(() => {
        Swal.fire({
          position: 'center',
          background: '#151515',
          icon: 'success',
          title: 'Link publicado com sucesso!',
          showConfirmButton: false,
          timer: 1500
        });
        setForm({ url: '', text: '' });
        setFormEnabled(true);
      })
      .catch(() => {
        Swal.fire({
          background: '#151515',
          icon: 'error',
          title: 'Oops...',
          text: 'Houve um erro ao publicar seu link!'
        });
        setFormEnabled(true);
      });
  }

  return (
    <Container>
      <img src='https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745' alt='User'/>
      <div>
        <Message>What are you going to share today?</Message>
        <Form onSubmit={newPost}>
          <Url
            type='url'
            placeholder='http://...'
            name='url'
            value={form.url}
            onChange={handleForm}
            disabled={!formEnabled}
            required
          />
          
          <Post 
            type='text'
            placeholder='Awesome article about #javascript'
            name='text'
            value={form.text}
            onChange={handleForm}
            disabled={!formEnabled}
          />

          <Button 
            type='submit' 
            title={formEnabled ? 'Publish' : 'Publishing...'}
            disabled={!formEnabled}
          >
            {formEnabled ? 'Publish' : 'Publishing...'}
          </Button>
        </Form>
      </div>
    </Container>
  );
}

const Container = styled.section`
  width: 100%;
  min-height: 209px;
  background-color: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  margin-bottom: 30px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
  }

  div {
    width: 100%;
    max-width: 500px;
  }

  @media (max-width: 610px) {
    border-radius: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 12px 15px;    

    img {
      display: none;
    }
  }
`;

const Message = styled.span`
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  font-size: 20px;
  line-height: 24px;
  color: #707070;

  @media (max-width: 610px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 15px;
`;

const Url = styled.input`
  width: 100%;
  height: 30px;
  background-color: #EFEFEF;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 8px 12px;
  border: none;
  outline: none;
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  font-size: 15px;
  line-height: 18px;

  &::placeholder {
    font-family: 'Lato', sans-serif;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;
    color: #949494;
  }

  &:focus {
    outline: none;
  }
  
  &:disabled {
    color: #AFAFAF;
    background-color: #F2F2F2;
    -webkit-text-fill-color: #AFAFAF;
    -webkit-box-shadow: 0 0 0px 45px #F2F2F2 inset;
    box-shadow: 0 0 0px 45px #F2F2F2 inset;
  }
`;

const Post = styled.textarea`
  width: 100%;
  height: 66px;
  background: #EFEFEF;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 8px 12px;
  border: none;
  outline: none;
  resize: none;
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  font-size: 15px;
  line-height: 18px;

  &::placeholder {
    font-family: 'Lato', sans-serif;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;
    color: #949494;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    color: #AFAFAF;
    background-color: #F2F2F2;
    -webkit-text-fill-color: #AFAFAF;
    -webkit-box-shadow: 0 0 0px 45px #F2F2F2 inset;
    box-shadow: 0 0 0px 45px #F2F2F2 inset;
  }
`;

const Button = styled.button`
  width: 112px;
  height: 31px;
  background-color: #1877F2;
  border-radius: 5px;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #FFFFFF;
  border: none;
  outline: none;
  cursor: pointer;

  &:hover {
    filter: brightness(130%);
  }

  &:disabled {
    filter: grayscale(60%);
    cursor: default;
  }
`;