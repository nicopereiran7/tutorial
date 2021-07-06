import moment from "moment";
import { createAccessToken, decodeToken } from "../services/jwt.js";
import User from "../models/User.js";

function willExpireToken(token) {
  const { exp } = token;
  const currentDate = moment().unix();

  if (currentDate > exp) {
    return true;
  }

  return false;
}

export const refreshAccessToken = (req, res) => {
  const { refreshToken } = req.body;
  const isExpireToken = willExpireToken(refreshToken);

  if (isExpireToken) {
    res.status(500).send({ message: "Token expirado" });
  } else {
    const { id } = decodeToken(refreshToken);

    User.findOne({ _id: id }, (err, userStored) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if (!userStored) {
          res.status(404).send({ message: "Usuario no econtrado" });
        } else {
          res.status(200).send({
            accessToken: createAccessToken(userStored),
            refreshToken: refreshToken,
          });
        }
      }
    });
  }
};
