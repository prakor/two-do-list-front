import { NavLink } from "react-router-dom";
import "./Login.css";
import logoImage from "@assets/images/logo/list.png";

const Login = () => {
  return (
    <div className="flex flex-col justify-between gap-8 pl-4 pr-4">
      <div className="header-title">
        <NavLink to="/login">
          <div className="flex flex-row items-center gap-2">
            <img src={logoImage} alt="icon" width="32px" />
            <div className="text-2xl font-semibold text-amber-500">
              Two door list
            </div>
          </div>
        </NavLink>
      </div>
      <div className="flex flex-row justify-between gap-4 mt-4">
        <div className="w-full">
          <div className="login-title">Log in</div>
          <form action="">
            {/* login */}
            <div>
              <span>Email</span>
              <div>
                <input type="text" placeholder="Enter your email..." />
              </div>
            </div>
            {/* password */}
            <div>
              <span>Password</span>
              <div>
                <input type="password" placeholder="Enter your password..." />
              </div>
            </div>
            <button>Log in</button>
          </form>
          <hr />
          <div className="flex flex-row justify-between">
            <div>Don't have an account?</div>
            <div>
              <NavLink to="/register">Sign up</NavLink>
            </div>
          </div>
        </div>
        <div className="w-full">IMG</div>
      </div>
    </div>
  );
};

export default Login;
