import "./generate.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useState } from "react";
import { useSelector } from "react-redux";
import { publicRequest } from "../../requestMethods";
import axios from "axios";

const Generate = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const user = useSelector((state) => state.user.userInfo);
  const token = useSelector((state) => state.user.authToken);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;

      try {
        await publicRequest.post("/upload/", data);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      const res = await axios.post("http://localhost:4000/api/post", newPost, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      window.location.replace("/write/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Navbar />
      <div className="generateContainer">
        <div className="generate">
          <div className="geneImg">
            {file && (
              <img
                className="generateImage"
                src={URL.createObjectURL(file)}
                alt=""
              />
            )}
            <label htmlFor="imgInput">
              <i
                style={{
                  cursor: "pointer",
                  color: "#f9db24",
                  marginTop: "10px",
                }}
                className="fas fa-lg fa-upload"
              />
            </label>
            <input
              type="file"
              id="imgInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <input
            className="gInput"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="gText"
            onChange={(e) => setDesc(e.target.value)}
          />
          <button className="gbtn" onClick={handleSubmit}>
            Generate
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Generate;
