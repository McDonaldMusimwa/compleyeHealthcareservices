const Schema = require("../models/user");

module.exports = {
  createTask: async (req, res) => {
    //#swagger.tags=['Task']

    try {
      const userId = req.params.userId;

      // Retrieve the user by their ID
      const user = await Schema.User.findById({ _id: userId });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // Create a new task
      const newTask = {
        title: req.body.title,
        description: req.body.description,
        dateToDo: req.body.dateToDo,
        time: req.body.time,
        status: req.body.status,
        recurrence: req.body.recurrence,
        collaborators: req.body.collaborators,
      };

      // Add the new task to the user's tasks array
      user.tasks.push(newTask);

      // Save the updated user
      await user.save();

      res.status(201).json({ success: "Task created successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message || "Failed to create task" });
    }
  },
  getAllAdminTasks: async (req, res) => {
    //#swagger.tags=['Task']
    try {
      const userId = req.params.userId;

      // Retrieve the user by their ID
      const user = await Schema.User.findById(userId);

      // Add the new task to the user's tasks array
      const tasks = user.tasks;
      const formattedTasks = tasks.map((task) => {
        return { ...task._doc, _id: task._id.toString() };
      });
      res.status(201).json(formattedTasks);
    } catch (error) {
      res.status(500).json({ error: error.message || "Failed to create task" });
    }
  },
  getTask: async (req, res) => {
    //#swagger.tags=['Task']
    try {
      const taskId = req.params.taskId;
      const userId = req.params.userId;

      // Retrieve the user by their ID
      const user = await Schema.User.findById({ _id: userId });

      if (!userId) {
        return res.status(404).json({ error: "User not found" });
      }
      const task = user.tasks.find((task) => task._id.toString() === taskId);

      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.status(200).json({ ...task._doc, _id: task._id.toString() });
    } catch (error) {
      res
        .status(500)
        .json({ error: error.message || "Failed to retrieve task" });
    }
  },
  modifyTask: async (req, res) => {
    //#swagger.tags=['Task']
    try {
      const taskId = req.params.taskId;
      const userId = req.params.userId;

      // Retrieve the user by their ID
      const user = await Schema.User.findById({ _id: userId });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Retrieve the task from the user's tasks array
      const task = user.tasks.find((task) => task._id.toString() === taskId);

      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      // Update the task properties with the modified values from the request
      task.title = req.body.title;
      task.description = req.body.description;
      task.dateToDo = req.body.dateToDo;
      task.time = req.body.time;
      task.status = req.body.status;
      task.recurrence = req.body.recurrence;
      task.collaborators = req.body.collaborators;

      // Save the updated user
      await user.save();

      res.status(200).json({ ...task._doc, _id: task._id.toString() });
    } catch (error) {
      res.status(500).json({ error: error.message || "Failed to update task" });
    }
  },
  getUserTasks: async (req, res) => {
  
    try {
      const adminUserId = req.params.adminId; // Assuming you have the admin user's ID available in the request parameters
      const ordinaryUserId = req.params.userId; // Assuming you have the ordinary user's ID available in the request parameters
      console.log(adminUserId)
      // Retrieve the admin user by their ID
      const adminUser = await Schema.User.findById(  adminUserId );

      if (!adminUser) {
        return res.status(404).json({ error: "Admin user not found" });
      }

      // Get the tasks assigned to the admin user
      const tasks = adminUser.tasks;

      // Search for tasks that match the ordinary user ID
      const userTasks = tasks.filter((task) =>
        task.collaborators.some(
          (collaborator) => collaborator.user.toString() === ordinaryUserId
        )
      );

      res.status(200).json({ tasks: userTasks });
    } catch (error) {
      res
        .status(500)
        .json({ error: error.message || "Failed to fetch user tasks" });
    }
  },
  deleteTask: async (req, res) => {
    //#swagger.tags=['Task']
    try {
      const taskId = req.params.taskId;
      const userId = req.params.userId;

      // Retrieve the user by their ID
      const user = await Schema.User.findById({ _id: userId });

      if (!userId) {
        return res.status(404).json({ error: "User not found" });
      }

      // Find the index of the task in the tasks array
      const taskIndex = user.tasks.findIndex(
        (task) => task._id.toString() === taskId
      );

      if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found" });
      }

      // Remove the task from the tasks array
      user.tasks.splice(taskIndex, 1);

      // Save the updated user object
      await user.save();

      res.status(200).json({ success: "Task deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message || "Failed to delete task" });
    }
  },
};
