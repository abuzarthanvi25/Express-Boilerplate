const appConfig = require("../config/app-config");
const jwt = require("jsonwebtoken");

const createToken = async (user) => {
  const expiresIn = appConfig.jwtExpiry,
    secretOrKey = appConfig.jwtSecret;
  const userInfo = { id: user?.id, email: user?.email };
  const token = jwt.sign(userInfo, secretOrKey, { expiresIn });
  return {
    expires_in: expiresIn,
    access_token: token,
  };
};

const createForgetPasswordToken = (email, expiresIn = "15 min") => {
  const userInfo = { user: email };
  const token = jwt.sign(userInfo, appConfig.jwtSecret, { expiresIn });

  return {
    expires_in: expiresIn,
    access_token: token,
  };
};

const createResetPasswordToken = async (email, expiresIn = "15 min") => {
  const userInfo = { user: email };
  const token = jwt.sign(userInfo, appConfig.jwtSecret, { expiresIn });

  return {
    expires_in: expiresIn,
    access_token: token,
  };
};

const decodeAndGetUser = async (access_token) => {
  if (!access_token) {
    return null;
  }
  const decoded = await jwt.verify(access_token, appConfig.jwtSecret);
  const userFromDb = decoded?.id
    ? await userService.findOne(decoded?.id)
    : null;
  if (userFromDb) {
    return { user: userFromDb, token: access_token };
  }
  return null;
};

const verifyForgotPasswordToken = async (access_token) => {
  if (!access_token) {
    return null;
  }
  const decoded = await jwt.verify(access_token, appConfig.jwtSecret);
  if (decoded) {
    return decoded;
  }
  return null;
};

module.exports = {
  createToken,
  createForgetPasswordToken,
  createResetPasswordToken,
  decodeAndGetUser,
  verifyForgotPasswordToken,
};
