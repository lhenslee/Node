const express = require("express");
const { check, validationResult } = require("express-validator");

const router = express.Router();

module.exports = params => {
  const { feedbackService } = params;

  router.get("/", async (req, res, next) => {
    try {
      const feedback = await feedbackService.getList();

      const errors = req.session.feedback ? req.session.feedback.errors : false;
      req.session.feedback = {};

      return res.render("layout", {
        pageTitle: "Feedback",
        template: "feedback",
        feedback,
        errors,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.post(
    "/",
    [
      check("name").trim().isLength({ min: 3, max: 30 }).escape().withMessage("A name is required"),
      check("email").trim().isEmail().normalizeEmail().withMessage("A normal email is required"),
      check("title")
        .trim()
        .isLength({ min: 3, max: 40 })
        .escape()
        .withMessage("A title is required"),
      check("message")
        .trim()
        .isLength({ min: 5, max: 255 })
        .escape()
        .withMessage("A message is required"),
    ],
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.session.feedback = {
          errors: errors.array(),
        };
        return res.redirect("/feedback");
      }
    }
  );

  return router;
};
