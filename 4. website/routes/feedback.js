const express = require("express");

const router = express.Router();

module.exports = params => {
  const { feedbackService } = params;

  router.get("/", async (req, res, next) => {
    try {
      const feedback = await feedbackService.getList();
      return res.render("layout", { pageTitle: "Feedback", template: "feedback", feedback });
    } catch (err) {
      return next(err);
    }
  });

  router.post("/", async (req, res, next) => {
    const feedback = await feedbackService.getList();
    feedback.push(req.body);
    res.render("layout", { pageTitle: "Feedback Submitted!", template: "feedback", feedback });
  });

  return router;
};
