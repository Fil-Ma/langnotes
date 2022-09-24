const bcrypt = require("bcrypt");

const hashPassword = async (password) => {

  console.log("---> Hashing User Password");
  try {

    console.log("---> generating salt...");
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    console.log("---> hashing...");
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;

  } catch(err) {
    throw new Error(err);
  }
}

module.exports = {
  hashPassword: hashPassword
}
