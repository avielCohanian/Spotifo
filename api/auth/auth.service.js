const bcrypt = require('bcrypt');
const userService = require('../user/user.service');
const logger = require('../../services/logger.service');

async function login(email, password) {
  logger.debug(`auth.service - login with email: ${email}`);
  const user = await userService.getByUsername(email);
  if (!user) return Promise.reject('Invalid email or password');
  // TODO: un-comment for real login
  const match = await bcrypt.compare(password, user.password);
  if (!match) return Promise.reject('Invalid username or password');

  delete user.password;
  user._id = user._id.toString();
  return user;
}

async function signup(username, password, email) {
  const saltRounds = 10;

  logger.debug(`auth.service - signup with username: ${username}, email: ${email}`);

  if (!username || !password || !email) return Promise.reject('email, username and password are required!');

  const user = await userService.getByUsername(email);
  if (!user) {
    const hash = await bcrypt.hash(password, saltRounds);
    return userService.add({ username, password: hash, email });
  } else {
    login(email, password);
  }
}

async function loginGoogle(email, password) {
  logger.debug(`auth.service - loginGoogle with email: ${email}`);
  const user = await userService.getByUsername(email);
  if (!user) return Promise.reject('Invalid email or password');
  // TODO: un-comment for real login
  const match = await bcrypt.compare(password, user.passwordGoogle);
  if (!match) return Promise.reject('Invalid username or password');

  delete user.password;
  delete user.passwordGoogle;
  user._id = user._id.toString();
  return user;
}

async function signupGoogle(username, passwordGoogle, email) {
  const saltRounds = 10;

  logger.debug(`auth.service - signupGoogle with username: ${username}, email: ${email}`);

  if (!username || !passwordGoogle || !email) return Promise.reject('email, username and passwordGoogle are required!');

  const user = await userService.getByUsername(email);
  if (!user) {
    const hash = await bcrypt.hash(passwordGoogle, saltRounds);
    return userService.add({ username, passwordGoogle: hash, email });
  } else {
    loginGoogle(email, passwordGoogle);
  }
}

module.exports = {
  signup,
  login,
  signupGoogle,
  loginGoogle,
};
