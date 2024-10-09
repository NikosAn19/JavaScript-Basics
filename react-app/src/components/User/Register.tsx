import "./Register.css";

export default function Register() {
  return (
    <>
      <div className="user__container">
        <div className="register__area">
          <h2>Register</h2>
          <form>
            <div className="input__box">
              <input type="text" required></input>
              <span>Username</span>
            </div>
            <div className="input__box">
              <input type="email" required></input>
              <span>Email</span>
            </div>
            <div className="input__box">
              <input type="password" required></input>
              <span>Password</span>
            </div>
            <div className="input__box">
              <input type="password" required></input>
              <span>Confirm Password</span>
            </div>
            <button>Register</button>
          </form>
        </div>

        <hr className="separator"></hr>

        <div className="register__area">
          <h2>Login</h2>
          <form>
            <div className="input__box">
              <input type="text" required></input>
              <span>Username</span>
            </div>
            <div className="input__box">
              <input type="password" required></input>
              <span>Password</span>
            </div>
            <button>Login</button>
          </form>
        </div>
      </div>
    </>
  );
}
