import axios from "axios";
import Swal from "sweetalert2";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { ReactTagify } from "react-tagify";

import UserContext from "../../contexts/userContext";

export default function Text({ postId, rightStates }) {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useContext(UserContext);
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const tagStyle = {
    fontFamily: "Lato, sans-serif",
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: 700,
    cursor: "pointer",
  };

  function updateText(newtext) {
    const body = { text: newtext };
    setLoading(true);
    axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/posts/${postId}`, body, config)
      .then((res) => {
        Swal.fire({
          position: "center",
          background: "#151515",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500
        });
        rightStates.setText(res.data.text);
        rightStates.setEditMode(false);
        setLoading(false);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.error
        });
        rightStates.setEditMode(true);
        setLoading(false);
      });
  }

  function submit(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      updateText(rightStates.text);
    } else if (e.keyCode === 27) {
      rightStates.setText(rightStates.OldText);
      rightStates.setEditMode(false);
    }
  }

  return (
    <>
      {rightStates.editMode ? (
        <textarea
          name="message"
          type="text"
          value={rightStates.text}
          onKeyDown={submit}
          onChange={(e) => rightStates.setText(e.target.value)}
          disabled={loading}
        />
      ) : (
        <ReactTagify
          tagStyle={tagStyle}
          tagClicked={tag => {
            navigate(`/hashtag/${tag.substring(1).replace(/[^\w\s"]|_/g, "")}`);
          }}
        >
          <h2>{rightStates.text}</h2>
        </ReactTagify>
      )}
    </>
  );
}
//
