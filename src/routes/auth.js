const express = require("express");
const authController = require("../controllers/auth");

// import authenticate from "../middlewares/auth";

const authRouter = express.Router();

/* NOTE - 
  to use an unprotected route: authRouter.post("/register", someController.function);
  to use a protected route: authRouter.post("/register", authenticate(), someController.function);
*/

authRouter.post("/register", authController.signup);
authRouter.post("/login", authController.login);

module.exports = authRouter;
