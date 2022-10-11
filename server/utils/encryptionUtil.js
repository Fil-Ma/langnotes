const bcrypt = require("bcrypt");

// hash password util
const hashPassword = async (password) => {
  try {
    // generating salt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // hashing
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;

  } catch(err) {
    throw new Error(err);
  }
}

module.exports = {
  hashPassword: hashPassword
}
