const mongoose = require('mongoose');
const UserInfo = mongoose.model('users_profile_datas');


module.exports = (app) => {
  // endpoint for get user info by id
  app.get(`/api/userInfo/:id`, async (req, res) => {
    const {id} = req.params;
    const userInfo = await UserInfo.findOne({id});
    return res.status(200).send(userInfo);
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
    await UserInfo.updateOne({id},req.body);
    const userInfo = await UserInfo.findOne({id})

    return res.status(200).send({
      error: false,
      statusMessage: {
        type: 'success',
        message: 'Změna byla úspěná'
      },
      userInfo
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