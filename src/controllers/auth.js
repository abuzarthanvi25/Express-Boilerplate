const asyncHandler = require("../utils/handlers/async-handler");
const bcrypt = require("bcryptjs");
const cleaner = require("../utils/handlers/cleaner");
const authValidators = require("../utils/validations/user");
const userService = require("../services/model-services/user-services");
const jwtService = require("../services/jwt");
const { HttpException, HttpSuccess } = require("../utils/custom-classes/http-responses");
const { ERROR_MESSAGES } = require("../config/enums/error-enums");
const { HTTP_CODES } = require("../config/enums/status-codes");

const login = asyncHandler(async (req, res) => {
    const body = cleaner.request(req, { body: ["email", "password"] });

    const { error, value } = authValidators.loginValidation.validate(body);

    if (error) {
        throw new HttpException(error.message, 400);
    }

    const user = await userService.findByEmail(value.email);

    if (!user) {
        throw new HttpException(ERROR_MESSAGES.USER_NOT_FOUND, HTTP_CODES.NOT_FOUND);
    }

    const passwordsMatch = await bcrypt.compare(value.password, user.password);

    if (!passwordsMatch) {
        throw new HttpException(ERROR_MESSAGES.USER_NOT_FOUND, HTTP_CODES.NOT_FOUND);
    }

    delete user.password;

    const { access_token } = await jwtService.createToken(user);

    res.status(HTTP_CODES.OK).send({ token: access_token, user });
});

const signup = asyncHandler(async (req, res) => {
    const body = cleaner.request(req, {
        body: [
            "userName",
            "email",
            "password",
        ],
    });

    const { error, value } = authValidators.registerValidation.validate(body);

    if (error) {
        throw new HttpException(error.message, HTTP_CODES.BAD_REQUEST);
    }

    const user = await userService.registerUser({ ...value });
    res
        .status(HTTP_CODES.OK)
        .send(
            new HttpSuccess(user, 'User registered successfully')
        );
});

const authController = {
    login,
    signup
}

module.exports = authController;
