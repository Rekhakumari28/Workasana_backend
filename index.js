// import express

const express = require("express");
const cors = require("cors");

const { initializeDatabase } = require("./db/db.connection.js");

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

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
const memberRouter = require("./routes/memberRouter.js")

//route

app.use("/api/projects", projectRouter)
app.use("/api/tags",tagRouter)
app.use("/api/teams",teamRouter)
app.use("/api/users",userRouter) 
app.use("/api/tasks", taskRouter)
app.use("/api/members", memberRouter)


//port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

module.exports = app;
