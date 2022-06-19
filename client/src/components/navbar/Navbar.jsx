import { useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const user = useSelector((state) => state.user.userInfo);
  const PF = "http://localhost:4000/images/";
  const dispath = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const search = location.search;
  const handleLogout = () => {
    dispath(logout());
  };
  return (
    <div className="navbarContainer">
      <div className="left">
        <Link to="/">
          <i className=" mainIcon fas fa-7x fa-camera"></i>
        </Link>
      </div>
      <div className="center">
        <Link
          style={{ textDecoration: "none", color: "#fefbf3" }}
          to="/"
          className="title"
        >
          Memories
        </Link>
      </div>
      {search ? (
        <div className="fill"></div>
      ) : (
        <div className="right">
          {user !== null ? (
            <div className="navuser">
              <img
                className="profilePic"
                src={
                  user.profilePic
                    ? PF + user.profilePic
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                }
                alt="profile"
              />
              <span className="greeting">
                {toggle ? (
                  <i
                    style={{ marginLeft: "1px" }}
                    className="navIcon fas fa-lg fa-caret-up"
                    onClick={() => setToggle(false)}
                  />
                ) : (
                  <i
                    style={{ marginLeft: "1px" }}
                    className="navIcon fas fa-lg fa-caret-down"
                    onClick={() => setToggle(true)}
                  />
                )}
              </span>
              {toggle && (
                <div className="dropdown">
                  <ul>
                    <li
                      onClick={() => navigate(`/?user=${user.username}`)}
                      className="list"
                    >
                      Your Memories
                    </li>
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={`/user/${user.id}`}
                    >
                      <li className="list">Edit Profile</li>
                    </Link>
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to="/"
                    >
                      <li onClick={handleLogout} className="list">
                        Logout
                      </li>
                    </Link>
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to="/generate"
                    >
                      <li className="list">Create</li>
                    </Link>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="navLogin">Login</button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;

// "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg";
