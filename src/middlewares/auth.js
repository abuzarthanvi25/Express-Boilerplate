const jwtService = require("../services/jwt");
const asyncHandler = require("../utils/handlers/async-handler");
const { ERROR_MESSAGES } = require("../config/enums/error-enums");
const { HttpException } = require("../utils/custom-classes/http-responses");

const authenticate = () =>
  asyncHandler(async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) throw new HttpException(ERROR_MESSAGES.UNAUTHORIZED, 401);

    const user = await jwtService.decodeAndGetUser(token);

    if (!user) throw new HttpException(`${ERROR_MESSAGES.UNAUTHORIZED}, ${ERROR_MESSAGES.USER_NOT_FOUND}`, 401);

    req.user = user;

    next();
  });

module.exports = authenticate;
