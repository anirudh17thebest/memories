import "./user.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useState } from "react";
import { useSelector } from "react-redux";
import { publicRequest } from "../../requestMethods";
import { useLocation } from "react-router-dom";
import {
  updateStart,
  updateSuccess,
  updateFail,
  logout,
} from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const User = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  const token = useSelector((state) => state.user.authToken);

  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch(updateStart());

    const updatedUser = {
      id: user.id,
      username,
      email,
      password,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await publicRequest.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const res = await axios.put(
        "http://localhost:4000/api/user/" + id,
        updatedUser,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      dispatch(updateSuccess(res.data));
      window.location.replace("/");
    } catch (err) {
      dispatch(updateFail());
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete("http://localhost:4000/api/user/" + id, {
        data: {
          id: user.id,
        },
        headers: {
          token: `Bearer ${token}`,
        },
      });
      dispatch(logout());
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Navbar />
      <div className="userContainer">
        <div className="user">
          <div className="images">
            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt=""
                className="userPhoto"
              />
            )}

            <label htmlFor="fileInput">
              <i
                style={{ cursor: "pointer", color: "#f9db24" }}
                className="fas fa-upload"
              />
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <form className="updateUser">
            <input
              className="userInput"
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="userInput"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <input
              className="userInput"
              type="password"
              placeholder="Confirm password"
            /> */}
            <input
              className="userInput"
              type="email"
              placeholder="E-Mail"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="userButton">
              <button
                style={{ backgroundColor: "teal", color: "white" }}
                className="btns"
                onClick={handleUpdate}
              >
                Update
              </button>
              <button
                style={{ backgroundColor: "red", color: "white" }}
                className="btns"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default User;
