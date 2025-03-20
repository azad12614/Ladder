// API/models/User.js
const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

const dbName = "Ladder";
const collectionName = "users";

class User {
  constructor(client) {
    this.db = client.db(dbName);
    this.collection = this.db.collection(collectionName);
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

module.exports = User;
