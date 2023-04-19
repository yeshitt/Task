const Quiz = require("../models/quiz.model");

exports.create = async function (req, res, next) {
  try {
    const quiz = new Quiz({
      question: req.body.question,
      options: req.body.options,
      rightAnswer: req.body.rightAnswer,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      status: "inactive",
    });
    await quiz.save();
    res.status(201).json({
      success: true,
      message: "Quiz created successfully",
      quiz: quiz,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error creating quiz",
      error: err,
    });
  }
};

exports.getActiveQuiz = async function (req, res, next) {
  try {
    const now = new Date();
    const quiz = await Quiz.findOne({
      startDate: { $lte: now },
      endDate: { $gte: now },
      status: "active",
    });
    if (!quiz) {
      res.status(404).json({
        success: false,
        message: "No active quiz found",
      });
    } else {
      res.status(200).json({
        success: true,
        quiz: quiz,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error getting active quiz",
      error: err,
    });
  }
};

exports.getQuizResult = async function (req, res, next) {
  try {
    const quiz = await Quiz.findById(req.params.id);
    const now = new Date();
    const diff = now.getTime() - quiz.endDate.getTime();
    if (diff < 0) {
      res.status(403).json({
        success: false,
        message: "Quiz result not available yet",
      });
    } else {
      res.status(200).json({
        success: true,
        result: quiz.rightAnswer,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error getting quiz result",
      error: err,
    });
  }
};

exports.getAllQuizzes = async function (req, res, next) {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json({
      success: true,
      quizzes: quizzes,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error getting all quizzes",
      error: err,
    });
  }
};
