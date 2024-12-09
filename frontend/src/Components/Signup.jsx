import { useState } from "react";
import "../assets/css/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPopupVisible, setPopupVisible] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let usernameError = "";
    let emailError = "";
    let passwordError = "";

    if (!formData.username) {
      usernameError = "Username is required";
    }

    if (!formData.email.includes("@")) {
      emailError = "Invalid email address";
    }

    if (formData.password.length < 8) {
      passwordError = "Password must be at least 8 characters";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(formData.password)
    ) {
      passwordError =
        "Password must contain at least one uppercase letter, one lowercase letter, and one number.";
    }

    if (usernameError || emailError || passwordError) {
      setErrors({
        username: usernameError,
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
          "http://localhost:5000/api/signup",
          formData
        );
        setSuccessMessage(response.data.message);
        setErrorMessage("");

        navigate("/todo");
      } catch (error) {
        setSuccessMessage("");
        setErrorMessage(error.response.data.error || "Signup failed");
      }
    } else {
      setSuccessMessage("");
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
    <div className="signup-container">
      <div className="signup-popup">
        <button className="close-button" onClick={handleClose}>
          ×
        </button>
        <h1>Sign Up</h1>
        {successMessage && <div className="success">{successMessage}</div>}
        {errorMessage && <div className="error">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
            {errors.username && <div className="error">{errors.username}</div>}
          </div>
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
            Sign Up
          </button>
        </form>
        <div className="login-link">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="login-link-text">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
