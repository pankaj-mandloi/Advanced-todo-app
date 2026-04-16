import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { signupSchema } from "../../utils/validationSchemas";

const Signup = ({ onSwitchToLogin }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = (data) => {
    setLoading(true);

    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

    const userExists = Array.isArray(existingUsers)
      ? existingUsers.some((user) => user.email === data.email)
      : false;

    if (userExists) {
      setError("email", { message: "Email already registered" });
      toast.error("Email already registered! Please use a different email.");
      setLoading(false);
      return;
    }

    const { confirmPassword, ...newUser } = data;
    const updatedUsers = Array.isArray(existingUsers)
      ? [...existingUsers, newUser]
      : [newUser];

    setTimeout(() => {
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      toast.success("Account created successfully! 🎉 Please login.");

      setLoading(false);
      onSwitchToLogin();
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              {...register("name")}
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

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

          <div className="mb-4">
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

          <div className="mb-6">
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
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
                Creating account...
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-green-600 hover:text-green-700 hover:underline font-medium"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;