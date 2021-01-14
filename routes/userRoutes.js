const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = (app) => {

  app.get(`/api/users`, async (req, res) => {
    const user = await User.find();
    return res.status(200).send(user);
  });

  app.post(`/api/user/login`, async (req, res) => {
    const users = await User.find();
    const reqBody = req.body;
    const correctUser = users.find(user => user.email === reqBody.email && user.password === reqBody.password);
    if (correctUser) {
      return res.status(200).send({
        error: false,
        loginSucces: true,
        correctUser
      });
    } else {
      return res.status(201).send({
        error: true,
        loginSucces: false,
      });
    }
  });

  app.post(`/api/user`, async (req, res) => {
    const users = await User.find();
    const reqBody = req.body;
    const correctReqBody = {
      email: reqBody.email,
      password: reqBody.password
    };
    const existUser = users.find(user => user.email === correctReqBody.email);
    if (!existUser) {
      const registerUser = await User.create(correctReqBody);
      return res.status(201).send({
        error: false,
        registerSucces: true,
        registerUser
      })
    } else {
      return res.status(403).send({
        error: true,
        registerSucces: false,
      })
    }
    
  })

  app.put(`/api/user/:id`, async (req, res) => {
    const {id} = req.params;

    let user = await User.findByIdAndUpdate(id, req.body);

    return res.status(202).send({
      error: false,
      user
    })
  });

  app.delete(`/api/user/:id`, async (req, res) => {
    const {id} = req.params;

    let user = await User.findByIdAndDelete(id);

    return res.status(202).send({
      error: false,
      user
    })

  })

}