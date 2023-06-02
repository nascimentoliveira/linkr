import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import axios from "axios";

import UserContext from "../contexts/userContext.js";
import Header from "../components/Header.js";
import Spinner from "../components/Spinner.js";

export default function Login() {
  const navigate = useNavigate();
  const [formEnabled, setFormEnabled] = useState(true);
  const [form, setForm] = useState({ email: "", password: "" });
  const { token, setToken, setUser } = useContext(UserContext);

  useEffect(() => {
    if (token) {
      navigate("/timeline");
    }
  }, []);


  function handleForm(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value.trim() });
  }

  function checkForm() {
    const emptyFields = Object.keys(form).filter(key => form[key].trim() === "");
    if (emptyFields.length > 0) {
      const last = emptyFields.pop();
      Swal.fire({
        icon: "warning",
        background: "#151515",
        text: (`
        ${(emptyFields.length > 0 ? emptyFields.join(", ") + " and " : "") + last} 
        ${emptyFields.length > 0 ? "fields" : "field"} 
        needs to be filled`
          .replace("email", "e-mail"))
      });
      return false;
    } else {
      return true;
    }
  }

  function signIn(e) {
    e.preventDefault();
    if (checkForm()) {
      setFormEnabled(false);
      axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth`, form)
        .then(res => {
          localStorage.setItem("Linkr", JSON.stringify(res.data));
          setToken(res.data.token);
          delete res.data.token;
          setUser(res.data);
          navigate("/timeline");
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            background: "#151515",
            title: "Oops...",
            text: err.response.data.error
          });
          setForm({
            ...form,
            password: ""
          });
          setFormEnabled(true);
        });
    }
  }

  return (
    <Container>
      <Header />
      <div className="right">
        <form onSubmit={signIn}>
          <input
            type="email"
            placeholder="e-mail"
            name="email"
            value={form.email}
            onChange={handleForm}
            disabled={!formEnabled}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={form.password}
            onChange={handleForm}
            disabled={!formEnabled}
          />

          <button
            type="submit"
            title={formEnabled ? "Send" : "Connecting..."}
            disabled={!formEnabled}
          >
            {formEnabled ? <h3>Sign In</h3> : <Spinner />}
          </button>
        </form>
        <div className="back">
          <h1 onClick={() => navigate("/signup")}>
            First time? Create an account!
          </h1>
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
      font-family: "Lato";
      font-style: normal;
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
      font-family: "Oswald", sans-serif;
      font-weight: 700;
      font-size: 22px;
      line-height: 40px;

      &::placeholder {
        font-family: "Oswald", sans-serif;
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
    font-family: "Oswald", sans-serif;
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
//
