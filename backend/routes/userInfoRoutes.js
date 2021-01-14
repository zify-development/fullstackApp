const mongoose = require('mongoose');
const UserInfo = mongoose.model('usersInfo');


module.exports = (app) => {
  // endpoint for get user info by id
  app.get(`/api/userInfo:id`, async (req, res) => {
    const {id} = req.params;
    const userInfo = await UserInfo.findById(id);
    return res.status(200).send(userInfo);
  });

  // endpoint for create user info by id
  app.post(`/api/userInfo:id`, async (req, res) => {
    const {id} = req.params;
    const reqBody = {
        ...req.body,
        id
    };
    const newUserInfo = await UserInfo.create(reqBody);
      return res.status(200).send({
        error: false,
        createUserInfoSucces: true,
        newUserInfo
      })
  });

  // endpoint for update user info by id
  app.put(`/api/user/:id`, async (req, res) => {
    const {id} = req.params;

    let updateUserInfo = await UserInfo.findByIdAndUpdate(id, req.body);

    return res.status(200).send({
      error: false,
      updateUserInfoSucces: true,
      updateUserInfo
    })
  });

  // app.delete(`/api/user/:id`, async (req, res) => {
  //   const {id} = req.params;

  //   let user = await User.findByIdAndDelete(id);

  //   return res.status(202).send({
  //     error: false,
  //     user
  //   })

  // })

}