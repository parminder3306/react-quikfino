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

// Custom Hooks
import apiCall from "../../hooks/ApiCall";
import redirect from "../../hooks/Redirect";
import validation from "../../hooks/Validation";

// Custom Utils
import session from "../../utils/Session";
import toast from "../../utils/Toast";

// Custom Styles
import style from "../../styles/Style";

const Login = ({ navigation }) => {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation.login()),
  });

  const showOrHidePassword = () => {
    setPasswordVisibility((prevVisibility) => !prevVisibility);
  };

  const submitLogin = async (data) => {
    try {
      setIsLoading(true);
      const result = await apiCall.login(data.email, data.password);
      if (result) {
        session.set({ token: result.token });
        redirect.goToMain(navigation);
      }
    } catch (error) {
      toast.snackBar(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.loginTitle}>Welcome Back</Text>
      <Text style={style.loginSubtitle}>Please log in to continue</Text>

      {/* Email Input */}
      <View style={style.inputContainer}>
        <Text style={style.label}>Email Address</Text>
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={errors.email ? style.inputError : style.input}
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />
      </View>
      <View style={Style.errorContainer}>
        {errors.email && (
          <Text style={Style.errorText}>{errors.email.message}</Text>
        )}
      </View>

      {/* Password Input */}
      <View style={Style.inputContainer}>
        <Text style={Style.label}>Password</Text>
        <View style={Style.passwordContainer}>
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={errors.password ? Style.inputError : Style.input}
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
      </View>
      <View style={Style.errorContainer}>
        {errors.password && (
          <Text style={Style.errorText}>{errors.password.message}</Text>
        )}
      </View>

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
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={[Style.link, Style.signupLink]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
