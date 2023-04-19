const express = require("express");
const router = express.Router();

const quizController = require("../controllers/quiz.controller");

router.post("/", quizController.create);
router.get("/active", quizController.getActiveQuiz);
router.get("/:id/result", quizController.getQuizResult);
router.get("/all", quizController.getAllQuizzes);

module.exports = router;
