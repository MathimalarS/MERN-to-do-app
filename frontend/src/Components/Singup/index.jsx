import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Signup = ({ onClose }) => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };

    try {
      const url = "http://localhost:5000/api/users"; // Backend URL
      const { data: res } = await axios.post(url, userData); // Send request to backend

      navigate("/login");
      console.log("User created:", res.message);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Something went wrong!"); // Display error message
        console.error("Error response:", error.response);
      } else {
        setError("Request failed! Please try again later.");
        console.error("Request error:", error);
      }
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup_container}>
        <button
          className={styles.close_button}
          onClick={() => (window.location = "/")}
        >
          X
        </button>
        <div className={styles.left}>
          <h1>Sign up</h1>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}{" "}
            {/* Display error message */}
            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
            <div className={styles.login_prompt}>
              <span>
                Already have an account?
                <Link to="/login">
                  <button type="button" className={styles.white_btn}>
                    Login
                  </button>
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
