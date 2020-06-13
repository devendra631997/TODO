const express = require('express');
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
const keys= require("./config/keys");
const routes=require("./controller/api/todo");
const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api/todo",routes);

mongoose.connect('mongodb://localhost/todo')
.then((res) => {
    console.log("Mongo Succesfully Connected")
}).catch((err) => {
    console.log("ERROR")
	console.log(err)
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
