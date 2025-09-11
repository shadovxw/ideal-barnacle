import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appContext } from "../context/appContext";
import axios from "axios";
import { toast } from "react-toastify";
import "./Login.css";

const Login = () => {
  const { backendUrl, setIsLoggedin , getUserData} = useContext(appContext);

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onsubmitHandler = async (e) => {
    try {
      e.preventDefault(); // It will stop from reloading the page after submit

      axios.defaults.withCredentials = true; // It will send the cookie

      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/login", {
          email,
          password,
        });
        console.log("login data from", data)
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
   

  return (
    <div className="login-container">
      <img
        onClick={() => navigate("/")}
        alt=""
        className="logo-nav"
      />
      <div className="login-form-wrapper">
        <h2 className="login-title">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>

        <p className="login-subtitle">
          {state === "Sign Up"
            ? "Create your account"
            : "Login to your account!"}
        </p>

        <form onSubmit={onsubmitHandler}>
          {state === "Sign Up" && (
            <div className="input-group">
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="form-input"
                type="text"
                placeholder="Enter Full Name"
                required
              />
            </div>
          )}

          <div className="input-group">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-input"
              type="email"
              placeholder="Enter Email"
              required
            />
          </div>

          <div className="input-group">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="form-input"
              type="password"
              placeholder="Enter Password"
              required
            />
          </div>

          <p
            onClick={() => navigate("/reset-password")}
            className="forgot-password"
          >
            Forgot password?
          </p>

          <button className="submit-button">
            {state}
          </button>
        </form>

        {state === "Sign Up" ? (
          <p className="toggle-text">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="toggle-link"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="toggle-text">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="toggle-link"
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;