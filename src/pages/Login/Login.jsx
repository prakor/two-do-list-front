import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Login.css";
import logoImage from "@assets/images/logo/list.png";
import work from "@assets/images/login/work.jpg";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    // e.preventDefault();
    setShowPassword(!showPassword);
  };

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
      <div className="flex flex-row justify-center gap-4 mt-4">
        <div className="w-lg justify-center lg:w-full flex flex-col gap-5">
          <div className="login-title text-3xl font-semibold">Log in</div>
          <hr className="border-gray-300" />
          <form action="" className="flex flex-col gap-4">
            {/* login */}
            <div className="border-1 border-solid border-gray-300 rounded-lg p-3 pb-2">
              <label className="text-xs font-semibold tracking-wider">
                Email
              </label>
              <div>
                <input
                  className="w-full mt-1 focus:outline-hidden text-base"
                  type="text"
                  placeholder="Enter your email..."
                />
              </div>
            </div>
            {/* password */}
            <div className="border-1 border-solid border-gray-300 rounded-lg p-3 pb-2">
              <label className="text-xs font-semibold tracking-wider">
                Password
              </label>
              <div className="flex flex-row justify-items-center  items-center">
                <input
                  className="w-full mt-1 focus:outline-hidden text-base"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password..."
                />
                <button onClick={togglePasswordVisibility} type="button">
                  {showPassword ? (
                    <FaRegEye className="text-lg" />
                  ) : (
                    <FaRegEyeSlash className="text-lg" />
                  )}
                </button>
              </div>
            </div>
            <button className="bg-amber-500 text-white py-2 rounded-lg text-lg font-bold hover:bg-amber-600">
              Log in
            </button>
          </form>
          <div className="text-sm">
            <NavLink
              className="text-amber-500 hover:text-amber-600 underline"
              to="/login"
            >
              Forgot your password?
            </NavLink>
          </div>
          <hr className="border-gray-300" />
          <div className="text-center text-sm">
            Don't have an account?
            <NavLink
              className="ml-2 text-amber-500 hover:text-amber-600 underline"
              to="/register"
            >
              Sign up
            </NavLink>
          </div>
        </div>
        <div className="hidden lg:flex w-full justify-center items-center">
          <div>
            <img src={work} alt="" className="w-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
