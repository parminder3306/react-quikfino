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
import Api from "../../hooks/Api";
import Redirect from "../../hooks/Redirect";
import Validation from "../../hooks/Validation";

// Custom Utils
import Toast from "../../utils/Toast";

// Custom Styles
import Style from "../../styles/Style";

const SignUp = ({ navigation }) => {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisibility] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Validation.RegisterRule()),
  });

  const showOrHidePassword = () => {
    setPasswordVisibility((prevVisibility) => !prevVisibility);
  };

  const showOrHideConfirmPassword = () => {
    setConfirmPasswordVisibility((prevVisibility) => !prevVisibility);
  };

  const submitSignUp = async (data) => {
    try {
      setIsLoading(true);
      const result = await Api.SignUp(data.name, data.email, data.password);
      if (result) {
        Redirect.GoToLogin(navigation);
      }
    } catch (error) {
      Toast.Snackbar(error.message || "Sign Up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={Style.container}>
      <Text style={Style.loginTitle}>Welcome</Text>
      <Text style={Style.loginSubtitle}>Create a QuikFino profile</Text>

      {/* Email Input */}
      <View style={Style.inputContainer}>
        <Text style={Style.label}>Email Address</Text>
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={errors.email ? Style.inputError : Style.input}
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

      {/* Confirm Password Input */}
      <View style={Style.inputContainer}>
        <Text style={Style.label}>Confirm Password</Text>
        <View style={Style.passwordContainer}>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={errors.confirmPassword ? Style.inputError : Style.input}
                placeholder="Confirm Password"
                secureTextEntry={!isConfirmPasswordVisible}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <TouchableOpacity
            onPress={showOrHideConfirmPassword}
            style={Style.inputRightIcon}
          >
            <FontAwesomeIcon
              icon={isConfirmPasswordVisible ? faEyeSlash : faEye}
              size={22}
              color="#FF6E40"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={Style.errorContainer}>
        {errors.confirmPassword && (
          <Text style={Style.errorText}>{errors.confirmPassword.message}</Text>
        )}
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={Style.buttonPrimary}
        onPress={handleSubmit(submitSignUp)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={Style.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      {/* Login Link */}
      <View style={Style.loginContainer}>
        <Text style={Style.alreadyAccountText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={[Style.link, Style.loginLink]}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;
