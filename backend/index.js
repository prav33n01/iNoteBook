const express = require("express");
const mongoose = require('mongoose');
var cors = require('cors')



mongoose.connect("mongodb://localhost:27017/inotebookDB");

const app = express();
app.use(express.json());
app.use(cors())

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(5000, (req,res)=>{
    console.log("listening on port 5000")
})

