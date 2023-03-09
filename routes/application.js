const express = require("express");

const router = express.Router();

const appController = require("../controllers/app");

const BASE_URL = "/api/application";

const redirect = (req, res) => {
  res.redirect(BASE_URL);
};

router.get("/", redirect);
router.get("/api", redirect);
router.get(BASE_URL, appController.getAllApps);
router.get(`${BASE_URL}/:applicationId`, appController.getApp);

module.exports = router;
