import { useState } from "react";
import "../assets/css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isPopupVisible, setPopupVisible] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let emailError = "";
    let passwordError = "";

    if (!formData.email.includes("@")) {
      emailError = "Invalid email address";
    }

    if (formData.password.length < 8) {
      passwordError = "Password must be at least 8 characters";
    }

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      return false;
    }

    return true;
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validate();
    if (isValid) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/login",
          formData
        );
        navigate("/todo");
      } catch (error) {
        setErrorMessage(error.response.data.error || "Login failed");
      }
    }
  };

  const handleClose = () => {
    setPopupVisible(false);
    navigate("/");
  };

  if (!isPopupVisible) {
    return null;
  }

  return (
    <div className="login-container">
      <div className="login-popup">
        <button className="close-button" onClick={handleClose}>
          ×
        </button>
        <h1>Login</h1>
        {errorMessage && <div className="error">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
        <div className="signup-link">
          <p>
            Don't have an account?
            <Link to="/signup" className="signup-link-text">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
