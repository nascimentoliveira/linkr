import { useState, useContext, } from "react";
import { FaTrash } from "react-icons/fa";
import Modal from "react-modal";
import axios from "axios";
import Swal from "sweetalert2";

import UserContext from "../contexts/userContext.js";

export default function DeletePost({ id, render, setRender }) {

  const [altertOpen, setAltertOpen] = useState(false);
  const { token } = useContext(UserContext);

  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const alertDeleteStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(255, 255, 255, 0.9)",
      zIndex: 100
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "597px",
      height: "262px",
      background: "#333333",
      borderRadius: "50px",
      textAlign: "center",
      color: "white",
      paddingLeft: "100px",
      paddingRight: "100px",
      fontSize: "34px"
    },
  };

  const cancelButtonStyle = {
    width: "134px",
    height: "37px",
    marginTop: "40px",
    marginRight: "25px",
    borderRadius: "5px",
    background: "#ffffff",
    color: "#1877F2",
    textDecoration: "none",
    fontFamily: "Lato",
    fontSize: "18px",
    fontWeight: "700",
    cursor: "pointer",
    border: "none"
  };

  const confirmButtonStyle = {
    width: "134px",
    height: "37px",
    marginTop: "40px",
    borderRadius: "5px",
    background: "#1877F2",
    color: "#ffffff",
    textDecoration: "none",
    fontFamily: "Lato",
    fontSize: "18px",
    fontWeight: "700",
    cursor: "pointer",
    border: "none"
  };

  function deletePost() {
    axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/posts/${id}`, config)
      .then(res => {
        setAltertOpen(!altertOpen);
        Swal.fire({
          position: "center",
          background: "#151515",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500
        });
        setRender(!render);
      })
      .catch(err => {
        setAltertOpen(!altertOpen);
        Swal.fire({
          background: "#151515",
          icon: "error",
          title: "Oops...",
          text: err.response.data.message
        });
      });
  }

  return (
    <>
      <FaTrash
        style={{ cursor: "pointer", color: "white" }}
        onClick={() => setAltertOpen(!altertOpen)}
      />
      <Modal
        style={alertDeleteStyles}
        isOpen={altertOpen}
        ariaHideApp={false}
        onRequestClose={() => setAltertOpen(!altertOpen)}
      >
        <div style={{ marginTop: "40px" }}>
          Are you sure you want to delete this post?
        </div>
        <button
          onClick={() => setAltertOpen(!altertOpen)}
          style={cancelButtonStyle}
        >
          No, go back
        </button>
        <button
          onClick={deletePost}
          style={confirmButtonStyle}
        >
          Yes, delete it
        </button>
      </Modal>
    </>
  );
}