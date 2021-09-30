const express = require("express");

const router = express.Router();

module.exports = params => {
  const { speakerService } = params;

  router.get("/", async (req, res) => {
    const speakers = await speakerService.getList();
    res.render("layout", { pageTitle: "Speakers", template: "speakers", speakers });
  });

  router.get("/:shortname", async (req, res) => {
    const speaker = await speakerService.getSpeaker(req.params.shortname);
    const artwork = await speakerService.getArtworkForSpeaker(req.params.shortname);
    res.render("layout", {
      pageTitle: req.params.shortname,
      template: "speaker",
      speaker,
      artwork,
    });
  });

  return router;
};
