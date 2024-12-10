import { useAuth } from "../Context/AuthProvider";
import "./Header.css";

export default function Header() {
  const { username } = useAuth();
  return (
    <>
      <div className="container">
        <div className="box1"></div>
        <div className="box3">
          <span className="username__text">
            Hello&nbsp;
            <b> {username}</b>
          </span>
          <button className="button__register">Logout</button>
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
