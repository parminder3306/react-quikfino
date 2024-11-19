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

// Custom hooks
import { useGoToMain } from "../../hooks/useRedirect";

// Custom utils
import Session from "../../utils/Session";
import ToastBar from "../../utils/ToastBar";

// Custom API
import useLoginApi from "../../api/useLoginApi";

// Custom styles
import useAppStyle from "../../styles/useAppStyle";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      ToastBar("Please fill in both email and password!");
      return;
    }

    if (!validateEmail(email)) {
      ToastBar("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      ToastBar("Password must be at least 6 characters.");
      return;
    }

    try {
      setIsLoading(true);
      // const useApiData = await useLoginApi(email, password);
      if (email === "parminder3306@gmail.com" && password === "123456") {
        Session.set({ email });
        ToastBar(email);
        useGoToMain(navigation);
      } else {
        ToastBar("Wrong details!");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      ToastBar(`Login Failed: ${error.message}`);
    }
  };

  return (
    <View style={useAppStyle.container}>
      <Text style={useAppStyle.loginTitle}>Welcome Back</Text>
      <Text style={useAppStyle.loginSubtitle}>Please log in to continue</Text>

      <TextInput
        style={useAppStyle.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={useAppStyle.passwordContainer}>
        <TextInput
          style={useAppStyle.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={useAppStyle.inputRightIcon}
        >
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            size={22}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
        <Text style={useAppStyle.link}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={useAppStyle.buttonPrimary}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={useAppStyle.buttonText}>Log In</Text>
        )}
      </TouchableOpacity>

      <View style={useAppStyle.signupContainer}>
        <Text style={useAppStyle.noAccountText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={[useAppStyle.link, useAppStyle.signupLink]}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
