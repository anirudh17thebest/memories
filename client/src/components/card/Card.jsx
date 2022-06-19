import "./card.css";
import { Link } from "react-router-dom";

const Card = ({ info }) => {
  const PF = "http://localhost:4000/images/";
  return (
    <div className="card">
      <img className="postImg" src={PF + info.photo} alt="memory" />
      <Link
        style={{ textDecoration: "none", color: "black" }}
        to={`/write/${info._id}`}
      >
        <span className="postTitle">{info.title}</span>
      </Link>
    </div>
  );
};

export default Card;
