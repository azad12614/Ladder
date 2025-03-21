require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 3000;

// Validate environment variables
if (!process.env.DB_URL || !process.env.JWT_SECRET) {
  console.error("Required environment variables are missing.");
  process.exit(1);
}

// Middleware
app.use(cors());
// app.use(cors({ origin: "http://localhost:5173" }));
app.use(cors({ origin: "https://cf-ladder.onrender.com" }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../UI")));

// MongoDB connection
const uri = process.env.DB_URL;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Database and collections
const dbName = "Ladder";
const collections = {
  R800: "800",
  R900: "900",
  R1000: "1000",
  R1100: "1100",
  R1200: "1200",
  R1300: "1300",
  R1400: "1400",
};

// Connect to MongoDB
async function connectToDB() {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB!");
    return client.db(dbName);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

// Generic CRUD operations for a collection
function createCRUDRoutes(db, collectionName) {
  const collection = db.collection(collectionName);

  // Add a problem
  app.post(`/add-${collectionName}`, async (req, res) => {
    try {
      const info = req.body;
      const result = await collection.insertOne(info);
      res.status(201).send(result);
    } catch (error) {
      res.status(500).send({ error: "Failed to add problem" });
    }
  });

  // Get all problems
  app.get(`/all-${collectionName}`, async (req, res) => {
    try {
      const result = await collection.find({}).toArray();
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send({ error: "Failed to fetch problems" });
    }
  });

  // Get a single problem by ID
  app.get(`/${collectionName}/:id`, async (req, res) => {
    try {
      const id = req.params.id;
      const result = await collection.findOne({ _id: new ObjectId(id) });
      if (!result) {
        return res.status(404).send({ error: "Problem not found" });
      }
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send({ error: "Failed to fetch problem" });
    }
  });

  // Update a problem by ID
  app.put(`/update-${collectionName}/:id`, async (req, res) => {
    try {
      const id = req.params.id;
      const problemId = { _id: new ObjectId(id) };
      const problemUpdate = req.body;
      const result = await collection.updateOne(problemId, {
        $set: problemUpdate,
      });
      if (result.matchedCount === 0) {
        return res.status(404).send({ error: "Problem not found" });
      }
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send({ error: "Failed to update problem" });
    }
  });

  // Delete a problem by ID
  app.delete(`/delete-${collectionName}/:id`, async (req, res) => {
    try {
      const id = req.params.id;
      const problemId = { _id: new ObjectId(id) };
      const result = await collection.deleteOne(problemId);
      if (result.deletedCount === 0) {
        return res.status(404).send({ error: "Problem not found" });
      }
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send({ error: "Failed to delete problem" });
    }
  });
}

// User model and authentication logic
class User {
  constructor(db) {
    this.collection = db.collection("users");
  }

  // Create a new user
  async createUser(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, email, password: hashedPassword, role: "admin" };
    const result = await this.collection.insertOne(user);
    return result;
  }

  // Find a user by username
  async findUserByUsername(username) {
    return await this.collection.findOne({ username });
  }

  // Find a user by email
  async findUserByEmail(email) {
    return await this.collection.findOne({ email });
  }

  // Update user password
  async updatePassword(username, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return await this.collection.updateOne(
      { username },
      { $set: { password: hashedPassword } }
    );
  }
}

// Generate JWT token
function generateToken(user) {
  return jwt.sign(
    { username: user.username, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
}

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send({ error: "Access denied. No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send({ error: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
}

// Auth Routes
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await userModel.findUserByUsername(username);
    if (existingUser) {
      return res.status(400).send({ error: "Username already exists" });
    }
    const result = await userModel.createUser(username, email, password);
    res.status(201).send({ message: "User registered successfully", result });
  } catch (error) {
    res.status(500).send({ error: "Failed to register user" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.findUserByUsername(username);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ error: "Invalid password" });
    }
    const token = generateToken(user);
    res.status(200).send({ message: "Login successful", token });
  } catch (error) {
    res.status(500).send({ error: "Failed to login" });
  }
});

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findUserByEmail(email);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    // Send password reset link (mock implementation)
    res.status(200).send({ message: "Password reset link sent to email" });
  } catch (error) {
    res.status(500).send({ error: "Failed to process request" });
  }
});

app.post("/update-password", async (req, res) => {
  const { username, newPassword } = req.body;
  try {
    const result = await userModel.updatePassword(username, newPassword);
    res.status(200).send({ message: "Password updated successfully", result });
  } catch (error) {
    res.status(500).send({ error: "Failed to update password" });
  }
});

// Protected route example
app.get("/protected", authenticateToken, (req, res) => {
  res.send({ message: "This is a protected route", user: req.user });
});

// Start the server
async function startServer() {
  const db = await connectToDB();
  global.userModel = new User(db); // Initialize User model

  // Create CRUD routes for each collection
  Object.keys(collections).forEach((key) => {
    createCRUDRoutes(db, collections[key]);
  });

  // Serve the UI
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../UI", "index.html"));
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

startServer().catch(console.error);
