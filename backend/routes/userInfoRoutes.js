const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const UserInfo = mongoose.model("users_profile_datas");

const TOKEN_SECRET = "icoders_secret";

const verifyToken = (token) => {
  return jwt.verify(token, TOKEN_SECRET);
};

module.exports = (app) => {
  // endpoint for get user info by id
  app.get(`/api/userInfo/`, async (req, res) => {
    if (req.headers && req.headers.authorization) {
      let authorization = req.headers.authorization,
        decoded;
      try {
        decoded = verifyToken(authorization);
        const userInfo = await UserInfo.findOne({ id: decoded.id });
        return res.status(200).send(userInfo);
      } catch (e) {
        return res.status(401).send("unauthorized");
      }
    }
  });

  // endpoint for create user info by id
  app.post(`/api/userInfo/`, async (req, res) => {
    if (req.headers && req.headers.authorization) {
      let authorization = req.headers.authorization,
        decoded;
      try {
        decoded = verifyToken(authorization);
        console.warn(req, "req");
        const reqBody = {
          ...req.body,
          id: decoded.id,
        };
        const newUserInfo = await UserInfo.create(reqBody);
        return res.status(200).send({
          error: false,
          statusMessage: {
            type: "success",
            message: "Změna byla úspěná",
          },
          newUserInfo,
        });
      } catch (e) {
        return res.status(401).send("unauthorized");
      }
    }
  });

  // endpoint for update user info by id
  app.put(`/api/userInfo/:id`, async (req, res) => {
    const { id } = req.params;
    await UserInfo.updateOne({ id }, req.body);
    const userInfo = await UserInfo.findOne({ id });

    return res.status(200).send({
      error: false,
      statusMessage: {
        type: "success",
        message: "Změna byla úspěná",
      },
      userInfo,
    });
  });

  // app.delete(`/api/user/:id`, async (req, res) => {
  //   const {id} = req.params;

  //   let user = await User.findByIdAndDelete(id);

  //   return res.status(202).send({
  //     error: false,
  //     user
  //   })

  // })
};
