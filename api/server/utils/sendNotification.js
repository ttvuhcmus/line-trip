const axios = require("axios");
const { FIREBASE } = require("../utils/domain");
require("dotenv").config();

const send = data => {
  const config = {
    method: "post",
    url: "https://fcm.googleapis.com/fcm/send",
    headers: {
      "Content-Type": "application/json",
      Authorization: `key=${FIREBASE.CLOUD_MESSAGE.FCM_KEY}`
    },
    data: data
  };
  console.log("config: ", config);
  return axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

const sendNotification = (token, type, title, body, id) => {
  const data = JSON.stringify({
    to: token,
    notification: {
      title,
      body
    },
    data: {
      type,
      id
    }
  });
  return send(data);
};

const sendNotificationMultiple = (token, type, title, body, id) => {
  const data = JSON.stringify({
    registration_ids: token,
    notification: {
      title,
      body
    },
    data: {
      type,
      id
    }
  });
  return send(data);
};

module.exports = {
  sendNotification,
  sendNotificationMultiple
};
