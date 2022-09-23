const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;

  } catch(err) {
    throw new Error(err);
  }
}

module.exports = {
  hashPassword: hashPassword
}
