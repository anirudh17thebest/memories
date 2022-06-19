import "./write.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import { useSelector } from "react-redux";
import axios from "axios";

const Write = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const user = useSelector((state) => state.user.userInfo);
  const [singlePost, setSinglePost] = useState({});
  const [updateMode, setUpdateMode] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const token = useSelector((state) => state.user.authToken);
  const PF = "http://localhost:4000/images/";

  useEffect(() => {
    const getSinglepost = async () => {
      try {
        const res = await publicRequest.get("/post/" + id);
        setSinglePost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getSinglepost();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(
        "http://localhost:4000/api/post/" + id,
        {
          username: user.username,
          title,
          desc,
        },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:4000/api/post/" + id, {
        data: {
          username: user.username,
        },
        headers: {
          token: `Bearer ${token}`,
        },
      });
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="writeContainer">
        {updateMode ? (
          <div className="updateWrite">
            <img
              src={PF + singlePost.photo}
              alt="mainPic"
              className="updatePic"
            />
            <input
              className="updateTitle"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="updateDesc"
              onChange={(e) => setDesc(e.target.value)}
            />
            <button className="updateBtn" onClick={handleUpdate}>
              Update
            </button>
          </div>
        ) : (
          <div className="write">
            <img
              src={PF + singlePost.photo}
              alt="mainPic"
              className="mainPic"
            />

            <span className="wTitle">{singlePost.title}</span>
            <div className="authorContent">
              <span className="created">
                By
                <Link
                  style={{
                    textDecoration: "none",
                    color: "tomato",
                    marginLeft: "3px",
                  }}
                  to={"/"}
                >
                  {singlePost.username}
                </Link>
              </span>
              {user ? (
                user.username === singlePost.username && (
                  <div className="change">
                    <i
                      style={{
                        marginRight: "11px",
                        color: "teal",
                        cursor: "pointer",
                      }}
                      className="far fa-edit"
                      onClick={() => setUpdateMode(true)}
                    />
                    <i
                      style={{ color: "red", cursor: "pointer" }}
                      className="fas fa-trash"
                      onClick={handleDelete}
                    />
                  </div>
                )
              ) : (
                <div></div>
              )}
            </div>
            <span className="blog">{singlePost.desc}</span>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Write;
