import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <p> &copy; JordanWorks {new Date().getFullYear()}</p>
    </div>
  );
};

export default Footer;
