const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const quizRoutes = require("./routes/quiz.routes");

const app = express();

mongoose.connect(
  "mongodb+srv://user:yashit123@cluster0.gvpcgae.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/quizzes", quizRoutes);

const port = 3000;

app.listen(port, () => {
  console.log("Server is up and running on port number " + port);
});
