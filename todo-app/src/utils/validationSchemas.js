import * as yup from "yup";

export const signupSchema = yup.object({
  name: yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  
  email: yup.string()
    .required("Email is required")
    .email("Please enter a valid email address (e.g., name@example.com)")  
    .matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/, "Email must have a valid domain (e.g., .com, .in, .org)"),
  
  password: yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  
  confirmPassword: yup.string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const loginSchema = yup.object({
  email: yup.string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: yup.string()
    .required("Password is required"),
});

export const todoSchema = yup.object({
  title: yup.string()
    .required("Title is required")
    .min(1, "Title cannot be empty"),
  description: yup.string()
    .required("Description is required")
    .min(1, "Description cannot be empty"),
  priority: yup.string()
    .required("Priority is required"),
});