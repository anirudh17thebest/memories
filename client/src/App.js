import "./App.css";
import Home from "./pages/home/Home";
import Write from "./pages/write/Write";
import User from "./pages/user/User";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Generate from "./pages/generate/Generate";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  const user = useSelector((state) => state.user.userInfo);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/write/:id" element={<Write />} />
        <Route path="/user/:userId" element={<User />} />
        {user ? (
          <Route path="*" element={<Navigate to="/" />} />
        ) : (
          <Route path="/register" element={<Register />} />
        )}

        {user ? (
          <Route path="*" element={<Navigate to="/" />} />
        ) : (
          <Route path="/login" element={<Login />} />
        )}
        <Route path="/generate" element={<Generate />} />
      </Routes>
    </Router>
  );
};

export default App;
