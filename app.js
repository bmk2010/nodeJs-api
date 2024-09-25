const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET_KEY = "movie_app";

// Dummy users for authentication
const users = {
  user1: "password1",
  user2: "password2",
};

// Route to display users (GET /users)
app.get("/users", (req, res) => {
  res.json(users);
});

// Route for login (POST /login)
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: "Username va parol kiriting" });
  }

  if (users[username] && users[username] === password) {
    const token = jwt.sign({ username }, JWT_SECRET_KEY, { expiresIn: "1h" });
    return res.status(200).json({ access_token: token });
  } else {
    return res.status(401).json({ msg: "Noto'g'ri username yoki parol" });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
