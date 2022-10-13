const createError = require("http-errors");
const bcrypt = require("bcrypt");

const { hashPassword } = require("../utils/encryptionUtil");
const UserQueries = require("../queries/user");
const UserQueriesInstance = new UserQueries();

module.exports = class AuthService {

  // register function
  async register(data) {
    const { email, password } = data;

    try {
      const user = await UserQueriesInstance.findOneByEmail(email);

      if (user) {
        throw createError(409, "Email already in use");
      }

      const hashedPassword = await hashPassword(password);

      if (hashedPassword) {
        data.password = hashedPassword;
      }

      const createdUser = await UserQueriesInstance.create(data);

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

  // Google login function
  async googleLogin(profile) {
    const { id, displayName, email } = profile;

    try {
      const user = await UserQueriesInstance.findOneByGoogleId(id);

      if (!user) {
        return await UserQueriesInstance.create({
          google: {
            id,
            displayName,
            email
          }
        })
      }

      return user;

    } catch(err) {
      throw createError(500, err);
    }
  };

  // Facebook login function
  async facebookLogin(profile) {
    const { id, displayName } = profile;

    try {
      const user = await UserQueriesInstance.findOneByFacebookId(id);

      if (!user) {
        return await UserQueriesInstance.create({ facebook: { id, displayName }});
      }

      return user;

    } catch(err) {
      throw createError(500, err);
    }
  }

}
