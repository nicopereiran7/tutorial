import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/contants";
import { BASE_PATH } from "../api/config";
import jwtDecode from "jwt-decode";

export function getAccessTokenApi() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  if (!accessToken || accessToken === "null") {
    return null;
  }

  return willExpireToken(accessToken) ? null : accessToken;
}

export function getRefreshTokenApi() {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  if (!refreshToken || refreshToken === "null") {
    return null;
  }

  return willExpireToken(refreshToken) ? null : refreshToken;
}

function willExpireToken(token) {
  const seconds = 60;
  const metaToken = jwtDecode(token);
  const { exp } = metaToken;
  const now = (Date.now() + seconds) / 1000;

  return now > exp;
}

export function refreshAccessTokenApi(refreshToken) {
  const url = `${BASE_PATH}/auth/refresh-access-token`;
  const bodyObj = {
    refreshToken: refreshToken,
  };
  const params = {
    method: "POST",
    body: JSON.stringify(bodyObj),
    headers: {
      "Content-type": "application/json",
    },
  };

  fetch(url, params)
    .then((response) => {
      if (response.status !== 200) {
        return null;
      }
      return response.json();
    })
    .then((result) => {
      if (!result) {
        // deslogear usuario
        logOut();
      } else {
        const { accessToken, refreshToken } = result;
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
      }
    });
}

export function logOut() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
}
