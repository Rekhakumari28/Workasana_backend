// import express

const express = require("express");
const app = express();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const { initializeDatabase } = require("./db/db.connection.js");

app.use(express.json());

initializeDatabase();

app.get("/", (req, res) => {
  res.send("Hello Welcome to Workasana backend.");
});

//import routers
const projectRouter = require("./routes/projectRouter.js")
const tagRouter = require("./routes/tagRouter.js")
const teamRouter = require("./routes/teamRouter.js")
const userRouter = require("./routes/userRouter.js")
const taskRouter = require("./routes/taskRouter.js")

//route
app.use("/api/projects", projectRouter)
app.use("/api/tags",tagRouter)
app.use("/api/teams",teamRouter)
app.use("/api/users",userRouter)
app.use("/api/tasks", taskRouter)


//port
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

module.exports = app;
