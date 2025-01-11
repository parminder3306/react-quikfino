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
import api from "../../hooks/Api";
import redirect from "../../hooks/Redirect";
import validation from "../../hooks/Validation";

// Custom Utils
import toast from "../../utils/Toast";

// Custom Styles
import style from "../../styles/Style";

const signUp = ({ navigation }) => {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisibility] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation.signUp()),
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
      const result = await api.signUp(data.email, data.password);
      if (result) {
        redirect.goToLogin(navigation);
      }
    } catch (error) {
      toast.snackBar(error.message || "Sign Up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.loginTitle}>Welcome</Text>
      <Text style={style.loginSubtitle}>Create a QuikFino profile</Text>

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
      <View style={style.errorContainer}>
        {errors.email && (
          <Text style={style.errorText}>{errors.email.message}</Text>
        )}
      </View>

      {/* Password Input */}
      <View style={style.inputContainer}>
        <Text style={style.label}>Password</Text>
        <View style={style.passwordContainer}>
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={errors.password ? style.inputError : style.input}
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
            style={style.inputRightIcon}
          >
            <FontAwesomeIcon
              icon={isPasswordVisible ? faEyeSlash : faEye}
              size={22}
              color="#FF6E40"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={style.errorContainer}>
        {errors.password && (
          <Text style={style.errorText}>{errors.password.message}</Text>
        )}
      </View>

      {/* Confirm Password Input */}
      <View style={style.inputContainer}>
        <Text style={style.label}>Confirm Password</Text>
        <View style={style.passwordContainer}>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={errors.confirmPassword ? style.inputError : style.input}
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
            style={style.inputRightIcon}
          >
            <FontAwesomeIcon
              icon={isConfirmPasswordVisible ? faEyeSlash : faEye}
              size={22}
              color="#FF6E40"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={style.errorContainer}>
        {errors.confirmPassword && (
          <Text style={style.errorText}>{errors.confirmPassword.message}</Text>
        )}
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={style.buttonPrimary}
        onPress={handleSubmit(submitSignUp)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={style.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      {/* Login Link */}
      <View style={style.loginContainer}>
        <Text style={style.alreadyAccountText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={[style.link, style.loginLink]}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default signUp;
