
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const taskRoutes = require('../backend/routes/TaskRouter');
const userRoutes = require('../backend/routes/UserRoutes')
const cors = require('cors')
app.use(cors())
app.use(express.json());

app.use('/api/tasks',taskRoutes)
app.use('/api/users',userRoutes)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });