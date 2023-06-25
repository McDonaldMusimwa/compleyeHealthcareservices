const mongoose = require("mongoose");
const Schema = require("../models/user");
const validator = require("validator");

module.exports = {
  createUser: async (req, res) => {
    //#swagger.tags=['User']
    try {
      // Perform validation using the validator library
      if (!validator.isLength(req.body.firstName, { min: 1 })) {
        return res.status(400).json({ error: "First name is required" });
      }
      if (!validator.isLength(req.body.lastName, { min: 1 })) {
        return res.status(400).json({ error: "Last name is required" });
      }
      if (!validator.isEmail(req.body.email)) {
        return res.status(400).json({ error: "Invalid email" });
      }
      if (!validator.isLength(req.body.password, { min: 1 })) {
        return res.status(400).json({ error: "Password is required" });
      }
      if (!validator.isIn(req.body.role, ["admin", "user"])) {
        return res.status(400).json({ error: "Invalid role" });
      }
  
      const newuser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      };
  
      const User = new Schema.User(newuser);
      const createdUser = await User.save();
      res.status(200).json({ success: "User created successfully" });
      return { ...createdUser._doc, _id: createdUser.toString() };
    } catch (error) {
      res.status(500).json({ error: error.message || "Failed to create user." });
    }
  },

  getUser: async (req, res) => {
    //#swagger.tags=['User']
    try {
      const userId = req.params.id; // Assuming the user id is passed as a URL parameter
      const user = await Schema.User.findOne({ _id: userId });
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
      const formattedUser = { ...user._doc, _id: user._id.toString() };
      res.json(formattedUser);
    } catch (error) {
      res.status(500).json({ error: error.message || "Failed to fetch user." });
    }
  },

  getAllUsers: async (req, res) => {
    //#swagger.tags=['User']
    try {
      const users = await Schema.User.find();
      const formattedUsers = users.map((user) => {
        return { ...user._doc, _id: user._id.toString() };
      });
      res.json(formattedUsers);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve users." });
    }
  },
  deleteUser: async (req, res) => {
    //#swagger.tags=['User']
    try {
      const userId = req.params.id;
      await Schema.User.deleteOne({ _id: userId });
      res.send("User deleted");
    } catch (error) {
      res.status(500).json({ error: "Failed to delete" });
    }
  },
  updateUser: async (req, res) => {
    //#swagger.tags=['User']
    try {
      const userId = req.params.id;
  
      // Perform validation using the validator library
      if (!validator.isLength(req.body.firstName, { min: 1 })) {
        return res.status(400).json({ error: "First name is required" });
      }
      if (!validator.isLength(req.body.lastName, { min: 1 })) {
        return res.status(400).json({ error: "Last name is required" });
      }
      if (!validator.isEmail(req.body.email)) {
        return res.status(400).json({ error: "Invalid email" });
      }
      if (!validator.isLength(req.body.password, { min: 1 })) {
        return res.status(400).json({ error: "Password is required" });
      }
      if (!validator.isIn(req.body.role, ["admin", "user"])) {
        return res.status(400).json({ error: "Invalid role" });
      }
  
      const userDetails = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      };
  
      await Schema.User.updateOne({ _id: userId }, { $set: userDetails });
      res.status(200).json({ success: "Modified successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message || "Failed to modify user." });
    }
  },
};
