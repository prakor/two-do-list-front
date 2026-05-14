import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { clearAuthError, loginUser } from "@store/slices/authSlice";
import logoImage from "@assets/images/logo/list.png";
import work from "@assets/images/login/work.jpg";
import "./Login.css";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    dispatch(clearAuthError());
    const result = await dispatch(loginUser(data));

    if (loginUser.fulfilled.match(result)) {
      const fromPath = location.state?.from?.pathname || "/app/today";
      navigate(fromPath, { replace: true });
    }
  };

  return (
    <div className="flex flex-col justify-between gap-8 pl-4 pr-4">
      <div className="header-title">
        <NavLink to="/login">
          <div className="flex flex-row items-center gap-2">
            <img src={logoImage} alt="icon" width="32px" />
            <div className="text-2xl font-semibold text-amber-500">Two do list</div>
          </div>
        </NavLink>
      </div>

      <div className="flex flex-row justify-center gap-4 mt-4">
        <div className="w-lg justify-center lg:w-full flex flex-col gap-5">
          <div className="login-title text-4xl font-semibold">Log in</div>
          <hr className="border-gray-300" />

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="border border-solid border-gray-300 rounded-lg p-3 pb-2">
              <label className="text-xs font-semibold tracking-wider">Email</label>
              <div>
                <input
                  {...register("email")}
                  className="w-full mt-1 focus:outline-hidden text-base"
                  type="text"
                  placeholder="Enter your email..."
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div className="border border-solid border-gray-300 rounded-lg p-3 pb-2">
              <label className="text-xs font-semibold tracking-wider">Password</label>
              <div className="flex flex-row items-center">
                <input
                  {...register("password")}
                  className="w-full mt-1 focus:outline-hidden text-base"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password..."
                />
                <button onClick={() => setShowPassword((current) => !current)} type="button">
                  {showPassword ? (
                    <FaRegEye className="text-lg" />
                  ) : (
                    <FaRegEyeSlash className="text-lg" />
                  )}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              disabled={isLoading}
              className="bg-amber-500 text-white py-2 rounded-lg text-lg font-bold hover:bg-amber-600 disabled:opacity-70"
            >
              {isLoading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <div className="text-sm">
            <NavLink className="text-amber-500 hover:text-amber-600 underline" to="/login">
              Forgot your password?
            </NavLink>
          </div>
          <hr className="border-gray-300" />
          <div className="text-center text-sm">
            Don&apos;t have an account?
            <NavLink className="ml-2 text-amber-500 hover:text-amber-600 underline" to="/register">
              Sign up
            </NavLink>
          </div>
        </div>

        <div className="hidden lg:flex w-full justify-center items-center">
          <div>
            <img src={work} alt="Work visual" className="w-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
