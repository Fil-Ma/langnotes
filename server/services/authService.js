const createError = require("http-errors");
const bcrypt = require("bcrypt");

const { hashPassword } = require("../utils/encryptionUtil");
const UserQueries = require("../queries/user");
const UserQueriesInstance = new UserQueries();

module.exports = class AuthService {

  // register function
  async register(data) {

    console.log("AuthService --# Called Service");

    const { email, password } = data;

    try {
      console.log("AuthService --# Verifying if user already exists...");
      const user = await UserQueriesInstance.findOneByEmail(email);

      if (user) {
        console.log("AuthService --# Error! User already exists");
        console.log("AuthService --# Terminating service...");
        throw createError(409, "Email already in use");
      }

      const hashedPassword = await hashPassword(password);

      if (hashedPassword) {
        data.password = hashedPassword;
      }

      console.log("AuthService --# Registering user...");

      const createdUser = await UserQueriesInstance.create(data);

      console.log("AuthService --# Terminating service...");
      return createdUser;

    } catch(err) {
      throw createError(500, err);
    }
  }

  // login function
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

  // for the future
  // manage login with google
  //manage login with facebook

}
