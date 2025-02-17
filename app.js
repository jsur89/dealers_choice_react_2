const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");

//Database
const db = require("./config/database");

//Test DB
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

const app = express();

//Handlebars Middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

//Index route
app.get("/", (req, res) => res.render("index", { layout: "landing" }));

//Todo routes
app.use("/todos", require("./routes/todos"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
