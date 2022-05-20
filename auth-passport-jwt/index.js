const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

//development env vars
require("dotenv").config();

//middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors());

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true },
  () => console.log("Connected to DB successfully")
);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
