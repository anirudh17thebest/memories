import "./login.css";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";

const Login = () => {
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup.string().required("This field cannot be left empty"),
      password: yup.string().required("This field cannot be left empty"),
    }),
    onSubmit: (values) => {
      try {
        const username = values.username;
        const password = values.password;
        loginUser({ username, password }, dispatch);
        setSuccess(true);
        if (success) {
          window.location.replace("/");
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <>
      <div className="navbarContainer">
        <div className="left">
          <Link to="/">
            <i className=" mainIcon fas fa-7x fa-camera"></i>
          </Link>
        </div>
        <div className="center">
          <span className="title">Memories</span>
        </div>
        <div className="right"></div>
      </div>
      <div className="loginContainer">
        <div className="login">
          <p className="loginTitle">Login</p>
          <form onSubmit={formik.handleSubmit} className="loginForm">
            <input
              className="loginInput"
              type="text"
              name="username"
              placeholder="Username"
              value={formik.values.username}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />

            {formik.touched.username && formik.errors.username ? (
              <p className="loginError">{formik.errors.username}</p>
            ) : null}

            <input
              className="loginInput"
              type="password"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />

            {formik.touched.password && formik.errors.password ? (
              <p className="loginError">{formik.errors.password}</p>
            ) : null}

            <button type="submit" className="loginButton">
              Login
            </button>
          </form>
          <span className="regUser">
            New user ? Register
            <Link style={{ textDecoration: "none" }} to="/register">
              <span style={{ color: "teal", marginLeft: "3px" }}>here</span>
            </Link>
          </span>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
