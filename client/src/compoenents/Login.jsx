import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function loginUser(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://mern-auth-app-bay.vercel.app//login",
        {
          email,
          password,
        }
      );

      // Assuming the response contains a token
      const { token } = response.data;

      // Save the token to localStorage or sessionStorage for future use
      localStorage.setItem("token", token);

      // Redirect the user to the dashboard page
      window.location.href = "/dashboard";
    } catch (error) {
      // Handle login errors
      console.error(error);
      window.alert("Failed to log in. Please check your credentials.");
    }
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#ecf0f1",
        color: "#34495e",
      }}
    >
      <div style={{ width: "40%" }}>
        <h1 style={{ textAlign: "center", marginTop: "25px" }}>Login</h1>
        <Form onSubmit={loginUser}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="danger" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
