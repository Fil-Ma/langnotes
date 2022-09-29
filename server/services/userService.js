const createError = require("http-errors");
const UserQueries = require("../queries/user");
const UserQueriesInstance = new UserQueries();

module.exports = class UserService {

  async get(data) {

    //console.log("UserService --# Called Get User Service");
    const { id } = data;

    try {
      //console.log("UserService --# Verifying if user already exists...");
      const user = await UserQueriesInstance.findOneById(id);

      if (!user) {
        //console.log("UserService --# Error! User does not exist");
        //console.log("UserService --# Terminating service...");
        throw createError(404, "User not found");
      }

      //console.log("UserService --# Retrieving user info...");
      return user;

    } catch(err) {
      throw err;
    }
  }

  async update(data) {

    console.log("UserService --# Called Update User Service");

    try {
      console.log("UserService --# Updating user info...");
      const user = await UserModelInstance.update(data);

      console.log("UserService --# Updated user info");
      console.log("UserService --# Termingating service...");
      return user;

    } catch(err) {
      throw err;
    }
  }


}
