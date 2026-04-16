import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { loginSchema } from "../../utils/validationSchemas";

const Login = ({ onLogin, onSwitchToSignup }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    setLoading(true);

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const user = Array.isArray(users)
      ? users.find(
          (u) => u.email === data.email && u.password === data.password
        )
      : null;

    setTimeout(() => {
      if (user) {
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ name: user.name, email: user.email })
        );
        onLogin();
      } else {
        setError("password", { message: "Invalid email or password" });
        toast.error("Invalid email or password! Please try again.");
      }

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-indigo-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              {...register("email")}
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={onSwitchToSignup}
            className="text-green-600 hover:text-green-700 hover:underline font-medium"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;