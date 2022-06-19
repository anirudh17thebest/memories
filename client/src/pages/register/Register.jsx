import "./register.css";
import Footer from "../../components/footer/Footer";
import { publicRequest } from "../../requestMethods";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const Register = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup.string().required("This field cannot be left empty"),
      email: yup
        .string()
        .email("Provide a valid E-Mail")
        .required("This field cannot be left empty"),
      password: yup
        .string()
        .required("This field cannot be left empty")
        .min(7, "Too short"),
    }),
    onSubmit: async (values) => {
      try {
        await publicRequest.post("/auth/register", {
          username: values.username,
          email: values.email,
          password: values.password,
        });
        window.location.replace("/login");
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
      <div className="registerContainer">
        <div className="register">
          <p className="registerTitle">Register</p>

          <form onSubmit={formik.handleSubmit} className="registerForm">
            <input
              className="registerInput"
              type="text"
              name="username"
              placeholder="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username ? (
              <p className="registerError">{formik.errors.username}</p>
            ) : null}

            <input
              className="registerInput"
              type="email"
              name="email"
              placeholder="E-Mail"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="registerError">{formik.errors.email} </p>
            ) : null}
            <input
              className="registerInput"
              type="password"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="registerError">{formik.errors.password}</p>
            ) : null}
            <button type="submit" className="registerButton">
              Register
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
