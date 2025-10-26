import { NavLink } from "react-router-dom";
import "./Login.css";
// import logo from "@/assets/images/logo/to-do-list.png";

const Login = () => {
  return (
    <div className="flex flex-col justify-between gap-8">
      <div className="header-title">
        <NavLink to="/">
          <div>
            {/* <img src={logo} alt="icon"/> */}
            Two door list
          </div>
        </NavLink>
      </div>
      <div className="flex flex-row justify-between gap-4 mt-4">
        <div className="">Login</div>
        <div className="">IMG</div>
      </div>
    </div>
  );
};

export default Login;
