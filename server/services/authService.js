const createError = require("http-errors");
const bcrypt = require("bcrypt");

const { hashPassword } = require("../utils/encryptionUtil");
const UserQueries = require("../queries/user");
const UserQueriesInstance = new UserQueries();

module.exports = class AuthService {

  async register(data) {
    const { email, password } = data;

    try {
      const user = await UserQueriesInstance.findOneByEmail(email);

      if (user) {
        throw createError(409, "Email already in use");
      }

      const hashedPassword = await hashPassword(password);

      if (hashedPassword) {
        data.password = hashPassword;
      }

      return await UserQueriesInstance.create(data);

    } catch(err) {
      throw createError(500, err);
    }
  }

  async login(data) {
    const { email, password } = data;

    try {
      const user = await UserQueriesInstance.findOneByEmail(email);

      if (!user) {
        throw createError(401, "Incorrect username or password");
      }

      const passwordCompareResult = await bcrypt.compare(password, user.password);

      if (!passwordCompareResult) {
        throw createError(401, "Incorrect username or password");
      }

      return user;

    } catch(err) {
      throw createError(500, err);
    }
  }
}
