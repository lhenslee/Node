const express = require("express");

const router = express.Router();

module.exports = () => {

  router.get("/", async (req, res) => {
    res.json('Speakers!');
  });

  router.get("/:shortname", (req, res) => {
    res.send(`Speaker ${req.params.shortname}`);
  });

  return router;
};
