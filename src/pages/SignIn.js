import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import Header from "../components/Header";
import UserContext from "../contexts/userContext";

const notify = (error) => {
    toast.error(`❗ ${error}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [load, setLoad] = useState(false);

    const navigate = useNavigate();
    const { setToken, token, setImage, setName } = useContext(UserContext);

    useEffect(() => {
        if (token) navigate("/timeline");
    }, []);

    function signIn(event) {
        event.preventDefault();
        setLoad(true);

        const body = {
            email,
            password,
        };
        console.log(process.env.REACT_APP_BASE_URL);
        const promise = axios.post(`${process.env.REACT_APP_BASE_URL}/`, body);

        promise.then((res) => {
            setLoad(false);
            localStorage.setItem("authToken", res.data.token);
            setImage(res.data.image);
            setName(res.data.name);
            setToken(localStorage.getItem("authToken"));
            navigate("/timeline");
        });

        promise.catch((Error) => {
            setLoad(false);
            if (Error.response.status === 401) {
                notify("User isn't registered or password is incorrect!");
            }
            if (Error.response.status === 500) {
                notify("Server error!");
            }
        });
    }

    return (
        <Container>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={true}
                limit={1}
            />
            <Header />
            <div className="right">
                <form onSubmit={signIn}>
                    <input
                        type="email"
                        placeholder="e-mail"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" disabled={load}>
                        {load ? <ThreeDots /> : <h3>Sign In</h3>}
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
            &::placeholder {
                font-weight: 700;
                font-size: 22px;
                line-height: 33px;
                color: #9f9f9f;
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
            color: #ffffff;
            font-weight: 700;
            font-size: 22px;
            line-height: 33px;
            cursor: pointer;
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