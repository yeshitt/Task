const mongoose = require("mongoose");

const QuizSchema = mongoose.Schema({
  question: String,
  options: [String],
  rightAnswer: Number,
  startDate: Date,
  endDate: Date,
  status: {
    type: String,
    enum: ["inactive", "active", "finished"],
  },
});

module.exports = mongoose.model("Quiz", QuizSchema);
