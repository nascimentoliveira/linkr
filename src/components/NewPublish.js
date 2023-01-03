import styled from 'styled-components';

export default function NewPublish() {
  return (
    <Container>
      <img src='https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745' alt='User'/>
      <div>
        <Message>What are you going to share today?</Message>
        <Form>
          <Url
            type='url'
            placeholder='http://...'
            name='url'
            required
          />
          
          <Post 
            type='text'
            placeholder='Awesome article about #javascript'
            name='post'
            required
          />

          <Button type='submit'>
            Publish
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

  @media (max-width: 610px) {
    border-radius: 0px;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    margin: 0px 14px;
  }

  div {
    width: 500px;
  }
`;

const Message = styled.span`
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  font-size: 20px;
  line-height: 24px;
  color: #707070;
  margin-bottom: 15px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 12px auto;
`;

const Url = styled.input`
  width: 100%;
  height: 30px;
  background-color: #EFEFEF;
  border-radius: 5px;
  margin-bottom: 5px;
  border: none;
  outline: none;

  &::placeholder {
    font-family: 'Lato', sans-serif;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;
    color: #949494;
    padding-left: 12px ;
  }
`;

const Post = styled.input`
  width: 100%;
  height: 66px;
  background: #EFEFEF;
  border-radius: 5px;
  margin-bottom: 5px;
  border: none;
  outline: none;

  &::placeholder {
    font-family: 'Lato', sans-serif;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;
    color: #949494;
    padding-left: 12px;
  }
`;

const Button = styled.button`
  width: 112px;
  height: 31px;
  background: #1877F2;
  border-radius: 5px;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #FFFFFF;
  border: none;
  outline: none;
  cursor: pointer;
`;