const Sequelize = require("sequelize");
const db = require("../config/database");
const { STRING, ENUM, BOOLEAN } = Sequelize;

const Todo = db.define("todo", {
  name: { type: STRING },
  priority: { type: ENUM("Low", "Medium", "High") },
  completed: {
    type: BOOLEAN,
    defaultValue: false,
  },
  description: { type: STRING },
});

module.exports = Todo;
