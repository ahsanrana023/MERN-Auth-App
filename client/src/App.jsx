import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./compoenents/Login";
import Register from "./compoenents/Register";
import Navbar from "./compoenents/NavbarElement";
import axios from "axios";
import Dashboard from "./compoenents/Dashboard";
import Footer from "./compoenents/Footer";
function App() {
  // axios.defaults.baseURL = "http://localhost:5000";
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
