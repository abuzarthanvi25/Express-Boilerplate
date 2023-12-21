const { ERROR_MESSAGES } = require("../../config/enums/error-enums");
const { HTTP_CODES } = require("../../config/enums/status-codes");
const { findOneByEmail, create, findAll } = require("../../repositories/user-repository");
const { HttpException } = require("../../utils/custom-classes/http-responses");
const bcrypt = require("bcryptjs");

const registerUser = async ({ email, password, userName }) => {
  try {
    const alreadyExists = await findOneByEmail(email);

    if (alreadyExists) {
      throw new HttpException(ERROR_MESSAGES.EMAIL_ALREADY_TAKEN, HTTP_CODES.CONFLICT);
    }

    const encryptedUserPassword = await bcrypt.hash(password);

    const createdUser = await create({ email, password: encryptedUserPassword, userName });

    return createdUser;
  } catch (error) {
    throw new HttpException(error?.toString(), HTTP_CODES.INTERNAL_SERVER_ERROR);
  }
};

const findAllUsers = async () => {
  try {
    const allUsers = await findAll();

    if (Array.isArray(allUsers)) {
      return allUsers;
    }

    return [];
  } catch (error) {
    throw new HttpException(error?.toString(), HTTP_CODES.INTERNAL_SERVER_ERROR);
  }
};

const findByEmail = async (email) => {
  try {
    const userFound = await findOneByEmail(email);

    if (userFound) {
      return userFound;
    }

    return null;
  } catch (error) {
    throw new HttpException(error?.toString(), HTTP_CODES.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  registerUser,
  findAllUsers,
  findByEmail,
};
