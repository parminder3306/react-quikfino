import * as Yup from "yup";

const Validation = {
  LoginRule: () => {
    return Yup.object().shape({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters long")
        .required("Password is required"),
    });
  },
};

export default Validation;
