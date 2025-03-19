// require("dotenv").config();
// const express = require("express");
// const path = require("path");
// const app = express();
// const cors = require("cors");
// const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// const port = process.env.PORT || 3000;

// app.use(cors());
// app.use(express.json());

// const uri = `${process.env.DB_URL}`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     const Pass = client.db("Ladder").collection("password");
//     const R800 = client.db("Ladder").collection("800");
//     const R900 = client.db("Ladder").collection("900");
//     const R1000 = client.db("Ladder").collection("1000");
//     const R1100 = client.db("Ladder").collection("1100");
//     const R1200 = client.db("Ladder").collection("1200");
//     const R1300 = client.db("Ladder").collection("1300");
//     const R1400 = client.db("Ladder").collection("1400");

//     // 800 Rating
//     //API
//     app.post("/add-800", async (req, res) => {
//       const info = req.body;
//       // insert mongodb
//       const result = await R800.insertOne(info);
//       res.send(result);
//     });

//     // API 2
//     app.get("/all-800", async (req, res) => {
//       const result = await R800.find({}).toArray();
//       res.send(result);
//     });

//     // API 3
//     app.get("/800/:id", async (req, res) => {
//       const id = req.params.id;
//       const result = await R800.findOne({ _id: new ObjectId(id) });
//       res.send(result);
//     });

//     // API 4
//     app.put("/update-800/:id", async (req, res) => {
//       const id = req.params.id;
//       const problemId = { _id: new ObjectId(id) };
//       const problemUpdate = req.body;
//       const updates = { $set: problemUpdate };
//       // update mongodb
//       const result = await R800.updateOne(problemId, updates);
//       res.send(result);
//     });

//     // API 5
//     app.delete("/delete-800/:id", async (req, res) => {
//       const id = req.params.id;
//       const problemId = { _id: new ObjectId(id) };
//       // delete mongodb
//       const result = await R800.deleteOne(problemId);
//       res.send(result);
//     });

//     // 900 Rating
//     //API
//     app.post("/add-900", async (req, res) => {
//       const info = req.body;
//       // insert mongodb
//       const result = await R900.insertOne(info);
//       res.send(result);
//     });

//     // API 2
//     app.get("/all-900", async (req, res) => {
//       const result = await R900.find({}).toArray();
//       res.send(result);
//     });

//     // API 3
//     app.get("/900/:id", async (req, res) => {
//       const id = req.params.id;
//       const result = await R900.findOne({ _id: new ObjectId(id) });
//       res.send(result);
//     });

//     // API 4
//     app.put("/update-900/:id", async (req, res) => {
//       const id = req.params.id;
//       const problemId = { _id: new ObjectId(id) };
//       const problemUpdate = req.body;
//       const updates = { $set: problemUpdate };
//       // update mongodb
//       const result = await R900.updateOne(problemId, updates);
//       res.send(result);
//     });

//     // API 5
//     app.delete("/delete-900/:id", async (req, res) => {
//       const id = req.params.id;
//       const problemId = { _id: new ObjectId(id) };
//       // delete mongodb
//       const result = await R900.deleteOne(problemId);
//       res.send(result);
//     });

//     // 1000 Rating
//     //API
//     app.post("/add-1000", async (req, res) => {
//       const info = req.body;
//       // insert mongodb
//       const result = await R1000.insertOne(info);
//       res.send(result);
//     });

//     // API 2
//     app.get("/all-1000", async (req, res) => {
//       const result = await R1000.find({}).toArray();
//       res.send(result);
//     });

//     // API 3
//     app.get("/1000/:id", async (req, res) => {
//       const id = req.params.id;
//       const result = await R1000.findOne({ _id: new ObjectId(id) });
//       res.send(result);
//     });

//     // API 4
//     app.put("/update-1000/:id", async (req, res) => {
//       const id = req.params.id;
//       const problemId = { _id: new ObjectId(id) };
//       const problemUpdate = req.body;
//       const updates = { $set: problemUpdate };
//       // update mongodb
//       const result = await R1000.updateOne(problemId, updates);
//       res.send(result);
//     });

//     // API 5
//     app.delete("/delete-1000/:id", async (req, res) => {
//       const id = req.params.id;
//       const problemId = { _id: new ObjectId(id) };
//       // delete mongodb
//       const result = await R1000.deleteOne(problemId);
//       res.send(result);
//     });

//     // 1100 Rating
//     //API
//     app.post("/add-1100", async (req, res) => {
//       const info = req.body;
//       // insert mongodb
//       const result = await R1100.insertOne(info);
//       res.send(result);
//     });

//     // API 2
//     app.get("/all-1100", async (req, res) => {
//       const result = await R1100.find({}).toArray();
//       res.send(result);
//     });

//     // API 3
//     app.get("/1100/:id", async (req, res) => {
//       const id = req.params.id;
//       const result = await R1100.findOne({ _id: new ObjectId(id) });
//       res.send(result);
//     });

//     // API 4
//     app.put("/update-1100/:id", async (req, res) => {
//       const id = req.params.id;
//       const problemId = { _id: new ObjectId(id) };
//       const problemUpdate = req.body;
//       const updates = { $set: problemUpdate };
//       // update mongodb
//       const result = await R1100.updateOne(problemId, updates);
//       res.send(result);
//     });

//     // API 5
//     app.delete("/delete-1100/:id", async (req, res) => {
//       const id = req.params.id;
//       const problemId = { _id: new ObjectId(id) };
//       // delete mongodb
//       const result = await R1100.deleteOne(problemId);
//       res.send(result);
//     });

//     // 1200 Rating
//     //API
//     app.post("/add-1200", async (req, res) => {
//       const info = req.body;
//       // insert mongodb
//       const result = await R1200.insertOne(info);
//       res.send(result);
//     });

//     // API 2
//     app.get("/all-1200", async (req, res) => {
//       const result = await R1200.find({}).toArray();
//       res.send(result);
//     });

//     // API 3
//     app.get("/1200/:id", async (req, res) => {
//       const id = req.params.id;
//       const result = await R1200.findOne({ _id: new ObjectId(id) });
//       res.send(result);
//     });

//     // API 4
//     app.put("/update-1200/:id", async (req, res) => {
//       const id = req.params.id;
//       const problemId = { _id: new ObjectId(id) };
//       const problemUpdate = req.body;
//       const updates = { $set: problemUpdate };
//       // update mongodb
//       const result = await R1200.updateOne(problemId, updates);
//       res.send(result);
//     });

//     // API 5
//     app.delete("/delete-1200/:id", async (req, res) => {
//       const id = req.params.id;
//       const problemId = { _id: new ObjectId(id) };
//       // delete mongodb
//       const result = await R1200.deleteOne(problemId);
//       res.send(result);
//     });

//     // 1300 Rating
//     //API
//     app.post("/add-1300", async (req, res) => {
//       const info = req.body;
//       // insert mongodb
//       const result = await R1300.insertOne(info);
//       res.send(result);
//     });

//     // API 2
//     app.get("/all-1300", async (req, res) => {
//       const result = await R1300.find({}).toArray();
//       res.send(result);
//     });

//     // API 3
//     app.get("/1300/:id", async (req, res) => {
//       const id = req.params.id;
//       const result = await R1300.findOne({ _id: new ObjectId(id) });
//       res.send(result);
//     });

//     // API 4
//     app.put("/update-1300/:id", async (req, res) => {
//       const id = req.params.id;
//       const problemId = { _id: new ObjectId(id) };
//       const problemUpdate = req.body;
//       const updates = { $set: problemUpdate };
//       // update mongodb
//       const result = await R1300.updateOne(problemId, updates);
//       res.send(result);
//     });

//     // API 5
//     app.delete("/delete-1300/:id", async (req, res) => {
//       const id = req.params.id;
//       const problemId = { _id: new ObjectId(id) };
//       // delete mongodb
//       const result = await R1300.deleteOne(problemId);
//       res.send(result);
//     });

//     // 1400 Rating
//     //API
//     app.post("/add-1400", async (req, res) => {
//       const info = req.body;
//       // insert mongodb
//       const result = await R1400.insertOne(info);
//       res.send(result);
//     });

//     // API 2
//     app.get("/all-1400", async (req, res) => {
//       const result = await R1400.find({}).toArray();
//       res.send(result);
//     });

//     // API 3
//     app.get("/1400/:id", async (req, res) => {
//       const id = req.params.id;
//       const result = await R1400.findOne({ _id: new ObjectId(id) });
//       res.send(result);
//     });

//     // API 4
//     app.put("/update-1400/:id", async (req, res) => {
//       const id = req.params.id;
//       const problemId = { _id: new ObjectId(id) };
//       const problemUpdate = req.body;
//       const updates = { $set: problemUpdate };
//       // update mongodb
//       const result = await R1400.updateOne(problemId, updates);
//       res.send(result);
//     });

//     // API 5
//     app.delete("/delete-1400/:id", async (req, res) => {
//       const id = req.params.id;
//       const problemId = { _id: new ObjectId(id) };
//       // delete mongodb
//       const result = await R1400.deleteOne(problemId);
//       res.send(result);
//     });

//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//   }
// }
// run().catch(console.dir);

// app.use(express.static(__dirname + "../../UI"));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "UI", "index.html"));
// });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;

// Validate environment variables
if (!process.env.DB_URL) {
  console.error("DB_URL environment variable is missing.");
  process.exit(1);
}

// Middleware
app.use(cors());
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

// Start the server
async function startServer() {
  const db = await connectToDB();

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
