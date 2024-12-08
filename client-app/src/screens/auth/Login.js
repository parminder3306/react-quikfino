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
import { useGoToMain } from "../../hooks/Redirect";

// Custom utils
import Session from "../../utils/Session";
import Toast from "../../utils/Toast";

// Custom API
import Api from "../../api/Api";

// Custom styles
import Style from "../../styles/Style";

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
      Toast.Snackbar("Please fill in both email and password!");
      return;
    }

    if (!validateEmail(email)) {
      Toast.Snackbar("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      Toast.Snackbar("Password must be at least 6 characters.");
      return;
    }

    try {
      setIsLoading(true);
      // const useApiData = await Api.Login(email, password);
      if (email === "parminder3306@gmail.com" && password === "123456") {
        Session.set({ email });
        Toast.Snackbar(email);
        useGoToMain(navigation);
      } else {
        Toast.Snackbar("Wrong details!");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Toast.Snackbar(`Login Failed: ${error.message}`);
    }
  };

  return (
    <View style={Style.container}>
      <Text style={Style.loginTitle}>Welcome Back</Text>
      <Text style={Style.loginSubtitle}>Please log in to continue</Text>

      <TextInput
        style={Style.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={Style.passwordContainer}>
        <TextInput
          style={Style.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={Style.inputRightIcon}
        >
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            size={22}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
        <Text style={Style.link}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={Style.buttonPrimary}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={Style.buttonText}>Log In</Text>
        )}
      </TouchableOpacity>

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
