import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAuthError, registerUser } from "@store/slices/authSlice";

const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(100),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters").max(100),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    dispatch(clearAuthError());

    const formData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    const result = await dispatch(registerUser(formData));
    if (registerUser.fulfilled.match(result)) {
      const payload = result.payload?.data ?? result.payload;
      const hasToken = Boolean(
        payload?.accessToken || payload?.tokens?.accessToken
      );
      navigate(hasToken ? "/app/today" : "/login", { replace: true });
    }
  };

  return (
    <div className="flex flex-row justify-center gap-8 pl-4 pr-4">
      <div className="flex flex-col items-center gap-5 w-full max-w-sm p-2 border border-transparent rounded-md bg-white">
        <div className="text-4xl font-semibold text-amber-500">Register Page</div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-2">
          <div className="w-full border border-solid border-gray-300 rounded-lg p-3 pb-2">
            <label className="text-xs font-semibold tracking-wider">Name</label>
            <div>
              <input
                {...register("name")}
                className="w-full mt-1 focus:outline-hidden text-base"
                type="text"
                placeholder="Enter your name..."
              />
            </div>
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div className="w-auto border border-solid border-gray-300 rounded-lg p-3 pb-2">
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
            <div>
              <input
                {...register("password")}
                className="w-full mt-1 focus:outline-hidden text-base"
                type="password"
                placeholder="Enter your password..."
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="border border-solid border-gray-300 rounded-lg p-3 pb-2">
            <label className="text-xs font-semibold tracking-wider">Confirm Password</label>
            <div>
              <input
                {...register("confirmPassword")}
                className="w-full mt-1 focus:outline-hidden text-base"
                type="password"
                placeholder="Enter your password..."
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="text-white py-2 rounded-lg bg-gradient-to-b from-amber-200 to-amber-500 md:bg-gradient-to-br lg:bg-gradient-to-r disabled:opacity-70"
          >
            {isLoading ? "Creating account..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
