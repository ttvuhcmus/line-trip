const axios = require("axios");
const { FIREBASE } = require("./domain");

const getTokenId = token => {
  const data = JSON.stringify({
    token,
    returnSecureToken: true
  });

  const config = {
    method: "post",
    url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${FIREBASE.AUTHENTICATION.API_KEY}`,
    headers: {
      "Content-Type": "application/json"
    },
    data
  };

  return axios(config)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(err => {
      return Promise.reject(err);
    });
};

const getNewTokenId = refresh_token => {
  const data = JSON.stringify({
    grant_type: "refresh_token",
    refresh_token
  });

  const config = {
    method: "post",
    url: `https://securetoken.googleapis.com/v1/token?key=${FIREBASE.AUTHENTICATION.API_KEY}`,
    headers: {
      "Content-Type": "application/json"
    },
    data
  };

  return axios(config)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(err => {
      return Promise.reject(err);
    });
};
module.exports = { getTokenId, getNewTokenId };
