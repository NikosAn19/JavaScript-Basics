import "./Header.css";

export default function Header() {
  return (
    <>
      <div className="container">
        <div className="box1"></div>
        <div className="box3">
          <button className="button">Login</button>
          <button className="button__register">Register</button>
        </div>
        <div className="hamburger">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </>
  );
}
