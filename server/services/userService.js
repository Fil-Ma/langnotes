const createError = require("http-errors");
const UserQueries = require("../queries/user");
const UserQueriesInstance = new UserQueries();

module.exports = class UserService {

  async get(data) {

    const { id } = data;

    try {
      const user = await UserQueriesInstance.findOneById(id);

      if (!user) {
        throw createError(404, "User not found");
      }

      return user;

    } catch(err) {
      throw err;
    }
  }

  async update(data) {
    try {
      const user = await UserModelInstance.update(data);

      return user;

    } catch(err) {
      throw err;
    }
  }


}
