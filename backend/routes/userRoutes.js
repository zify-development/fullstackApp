const mongoose = require('mongoose');
const User = mongoose.model('users');


module.exports = (app) => {

  // endpoint for get user all users
  app.get(`/api/users`, async (req, res) => {
    const user = await User.find();
    return res.status(200).send(user);
  });

  // endpoint for login user
  app.post(`/api/user/login`, async (req, res) => {
    const users = await User.find();
    const reqBody = req.body;

    const correctUser = users.find(user => user.email === reqBody.email && user.password === reqBody.password);

    if (correctUser) {
      return res.status(200).send({
        error: false,
        loginUserSucces: true,
        correctUser
      });
    }
  });

  // endpoint for register new user
  app.post(`/api/user`, async (req, res) => {
    const users = await User.find();
    const reqBody = req.body;

    const existUser = users.find(user => user.email === reqBody.email);
    if (!existUser) {
      const registerUser = await User.create(reqBody);
      return res.status(201).send({
        error: false,
        registerUserSucces: true,
        registerUser
      })
    }
    
  })

  // endpoint for update user by id
  app.put(`/api/user/:id`, async (req, res) => {
    const {id} = req.params;

    let user = await User.findByIdAndUpdate(id, req.body);

    return res.status(202).send({
      error: false,
      updateUserSucces: true,
      user
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