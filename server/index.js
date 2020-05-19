var express = require("express");
var bodyParser = require("body-parser");

var store = require("./routes/store"); // Imports routes for the stores
var app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, PATCH"); 
  next();
});

// Set up mongoose connection
var mongoose = require("mongoose");
var dev_db_url =
  "mongodb+srv://prismadmin:AqFEENgKal2xre23@cluster0-2khdi.mongodb.net/test?retryWrites=true&w=majority";
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/stores", store);

var port = 1234;

app.listen(port, () => {
  console.log("Server is up and running on port numner " + port);
});
