import jwt from "jwt-simple";
import moment from "moment";

const SECRET_KEY = "JaiFJ8ha5gfas15ffkJAUS8sjaLAGPsj8SHAO9sh";

export function createAccessToken(user) {
  const payload = {
    id: user._id,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    createToken: moment().unix(),
    exp: moment().add(3, "hours").unix(),
  };

  return jwt.decode(payload, SECRET_KEY);
}

export function createRefreshToken(user) {
  const payload = {
    id: user._id,
    exp: moment().add(30, "days").unix(),
  };

  return jwt.encode(payload, SECRET_KEY);
}

export function decodeToken(token) {
  return jwt.decode(token, SECRET_KEY, true);
}
