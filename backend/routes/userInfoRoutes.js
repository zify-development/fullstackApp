const mongoose = require('mongoose');
const UserInfo = mongoose.model('users_profile_datas');


module.exports = (app) => {
  // endpoint for get user info by id
  app.get(`/api/userInfo/:id`, async (req, res) => {
    const {id} = req.params;
    const usersInfo = await UserInfo.find();
    const correctUser = usersInfo.find(userInfo => userInfo.id === id);
    return res.status(200).send(correctUser);
  });

  // endpoint for create user info by id
  app.post(`/api/userInfo/:id`, async (req, res) => {
    const {id} = req.params;
    const reqBody = {
        ...req.body,
        id
    };
    const newUserInfo = await UserInfo.create(reqBody);
      return res.status(200).send({
        error: false,
        statusMessage: {
          type: 'success',
          message: 'Změna byla úspěná'
        },
        newUserInfo
      })
  });

  // endpoint for update user info by id
  app.put(`/api/userInfo/:id`, async (req, res) => {
    const {id} = req.params;
    const usersInfo = await UserInfo.find();
    const correctUser = usersInfo.find(userInfo => userInfo.id === id);
    let updateUserInfo = await UserInfo.findByIdAndUpdate(correctUser._id, req.body);

    return res.status(200).send({
      error: false,
      statusMessage: {
        type: 'success',
        message: 'Změna byla úspěná'
      },
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