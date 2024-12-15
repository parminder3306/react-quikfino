// React-Native libraries
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

// Third-party libraries
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Custom hooks
import Api from "../../hooks/Api";
import { useGoToMain } from "../../hooks/Redirect";

// Custom utils
import Session from "../../utils/Session";
import Toast from "../../utils/Toast";

// Custom styles
import Style from "../../styles/Style";

// Validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

const Login = ({ navigation }) => {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const showOrHidePassword = () => {
    setPasswordVisibility((prevVisibility) => !prevVisibility);
  };

  const submitLogin = async (data) => {
    try {
      setIsLoading(true);
      const result = await Api.Login(data.email, data.password);

      if (result) {
        const { token } = result;
        Session.set({ token });
        useGoToMain(navigation);
        Toast.Snackbar("Login successful!");
      }
    } catch (error) {
      Toast.Snackbar(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={Style.container}>
      <Text style={Style.loginTitle}>Welcome Back</Text>
      <Text style={Style.loginSubtitle}>Please log in to continue</Text>

      {/* Email Input */}
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              Style.input,
              errors.email ? { borderColor: "red", borderWidth: 1 } : {},
            ]}
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && (
        <Text style={Style.errorText}>{errors.email.message}</Text>
      )}

      {/* Password Input */}
      <View style={Style.passwordContainer}>
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                Style.input,
                errors.password ? { borderColor: "red", borderWidth: 1 } : {},
              ]}
              placeholder="Password"
              secureTextEntry={!isPasswordVisible}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <TouchableOpacity
          onPress={showOrHidePassword}
          style={Style.inputRightIcon}
        >
          <FontAwesomeIcon
            icon={isPasswordVisible ? faEyeSlash : faEye}
            size={22}
            color="#FF6E40"
          />
        </TouchableOpacity>
      </View>
      {errors.password && (
        <Text style={Style.errorText}>{errors.password.message}</Text>
      )}

      {/* Forgot Password */}
      <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
        <Text style={Style.link}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <TouchableOpacity
        style={Style.buttonPrimary}
        onPress={handleSubmit(submitLogin)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={Style.buttonText}>Log In</Text>
        )}
      </TouchableOpacity>

      {/* Sign Up Link */}
      <View style={Style.signupContainer}>
        <Text style={Style.noAccountText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={[Style.link, Style.signupLink]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
