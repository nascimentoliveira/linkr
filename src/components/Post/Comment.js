import { useNavigate } from "react-router";
import styled from "styled-components";

export default function Comment({ userId, picture, username, isAuthor, follow, comment }) {
  const navigate = useNavigate();
  return (
    <>
      <CommentStyled>
        <img
          src={picture}
          alt="User"
          onClick={() => navigate(`/users/${userId}`)}
        />
        <div>
          <h4 onClick={() => navigate(`/users/${userId}`)}>
            {username}
            {isAuthor ? <span> • post's author</span> : follow ? <span> • following</span> : null}
          </h4>
          <h5>{comment}</h5>
        </div>
      </CommentStyled>
      <Bar />
    </>
  );
}

const CommentStyled = styled.div`
  display: flex;
  margin: 23px 0px;
  h4 {
    color: #F3F3F3;
    font-weight: 700;
    font-size: 17px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    span {
      font-weight: 400;
      color: #565656;
      font-size: 15px;
      margin-left: 7px;
    }
  }
  h5 {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #ACACAC;
  }
  img {
    margin-right: 20px;
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
`;

const Bar = styled.div`
  background-color: white;
  width: 100%;
  border: 1px solid #353535;
`;
//
