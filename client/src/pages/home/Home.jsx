import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import Card from "../../components/card/Card";
import Footer from "../../components/footer/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import { postStart, postSuccess, postFail } from "../../redux/postSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const location = useLocation();
  const search = location.search;
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post.postInfo);
  useEffect(() => {
    const getProduct = async () => {
      dispatch(postStart());
      try {
        const res = await publicRequest.get("/post/" + search);
        dispatch(postSuccess(res.data));
      } catch (err) {
        dispatch(postFail());
      }
    };
    getProduct();
  }, [dispatch, search]);

  return (
    <div>
      <Navbar />
      <div className="feed">
        {post.map((p) => {
          return <Card key={p._id} info={p} />;
        })}
      </div>
      {search ? null : <Footer />}
    </div>
  );
};

export default Home;
