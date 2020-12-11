const express = require("express");
const router = express.Router();
const db = require("../config/database"); //bringing in our database
const Todo = require("../models/Todo"); //bringing in our model

//create a route for /todos where we can fetch our todo's
router.get("/", (req, res) =>
  Todo.findAll()
    .then((todos) => {
      res.render("todos", {
        todos,
      });
    })
    .catch((err) => console.log(err))
);

//Display add Todo form
router.get("/add", (req, res) => res.render("add"));

//Add a todo
router.post("/add", (req, res) => {
  let { name, priority, completed, description } = req.body;
  let errors = [];

  //validate fields
  if (!name) {
    errors.push({ text: "Please add a Name for the Todo" });
  }
  if (!priority) {
    errors.push({ text: "Please add a Priority Level for the Todo" });
  }
  if (!completed) {
    errors.push({ text: "Please add a Completion Status for the Todo" });
  }
  if (!description) {
    errors.push({ text: "Please add a Description for the Todo" });
  }

  //Check for errors
  if (errors.length > 0) {
    res.render("add", {
      errors,
      name,
      priority,
      completed,
      description,
    });
  } else {
    //Insert into table
    Todo.create({
      name,
      priority,
      completed,
      description,
    })
      .then((todo) => res.redirect("/todos"))
      .catch((err) => res.render("error", { error: err.message }));
  }
});

module.exports = router;
