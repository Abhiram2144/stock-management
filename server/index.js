const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(cors());
app.use(express.json());
mongoose.set('strictQuery', true);
const router = require("./router/router");
app.use(express.urlencoded({ extended: true}));
app.use(express.urlencoded({}))

app.listen(8080,()=>{
    console.log("Server is Running on port 8080. ");
    mongoose.connect("mongodb+srv://admin:admin@cluster0.li72vvb.mongodb.net/?retryWrites=true&w=majority")
    .then(()=>{
        console.log("Connected to database!");
    }
    );

})


app.use("/stocks",router);
app.use("/", router);