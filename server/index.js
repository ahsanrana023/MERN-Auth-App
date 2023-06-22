const express = require("express");
const app = express();
const User = require("./models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
app.use(cors());
app.use(express.json());
const hashSalt = bcrypt.genSaltSync(10);
mongoose.connect(process.env.MONGO_URL);
app.get("/test", (req, res) => {
  res.json("Test ok");
});

//Registartion Route
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, hashSalt),
    });
    res.status(200).json(userDoc);
    // Assuming registration was successful
  } catch (error) {
    // Handling any errors that occurred during registration
    alert("Error during registration: " + error.message);
    res.status(500).json({ error: "Registration failed" });
  }
});

//Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user based on the provided email
    const user = await User.findOne({ email });

    // If the user doesn't exist, return an error response
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the provided password with the hashed password
    const isPasswordMatch = bcrypt.compareSync(password, user.password);

    // If the passwords don't match, return an error response
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ email: email }, "your-secret-key", {
      expiresIn: "1h",
    });
    // Passwords match, login successful
    res.status(200).json({ user, token });
  } catch (error) {
    console.error(error);
    // Handle the error and send an appropriate response
    res.status(500).json({ error: "An error occurred during login" });
  }
});

//Port Connection
const port = 5000;

app.listen(port, () => {
  console.log(`Authentication app listening on port ${port}`);
});

//80Zg65QRu32kLqZb
