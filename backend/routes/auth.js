const express = require("express");
const { RegisterUser, LoginUser } = require("../handlers/auth-handler");
const router = express.Router();

router.post("/register", async (req, res) => {
  let model = req.body;
  if (model.name && model.email && model.password) {
    // to-do register
    await RegisterUser(model);
    res.send({
      message: "User Regiseterd!",
    });
  } else {
    res.status(400).json({
      error: "Please provide name, email and password",
    });
  }
});

router.post("/login", async (req, res) => {
  let model = req.body;
  if (model.email && model.password) {
    // to-do register
    let result = await LoginUser(model);
    // res.send(result);
    if (result) {
      res.send(result);
    } else {
      res.status(400).json({
        error: "Email or Password is incorrect",
      });
    }
  } else {
    res.status(400).json({
      error: "Please provide email and password",
    });
  }
});

module.exports = router;
