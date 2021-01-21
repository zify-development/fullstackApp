const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = mongoose.model("users");

const TOKEN_SECRET = "icoders_secret";

const verifyToken = (token) => {
  return jwt.verify(token, TOKEN_SECRET);
};

module.exports = (app) => {
  // endpoint for get user all users
  app.get(`/api/users`, async (req, res) => {
    const user = await User.find();
    return res.status(200).send(user);
  });

  // register route
  app.post("/api/user/register", async (req, res) => {
    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist)
      return res
        .status(400)
        .send({ error: "Uživatel s tímto emailem už existuje" });
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      email: req.body.email,
      password,
      role: "admin",
    });
    try {
      const savedUser = await user.save();
      res.json({ error: null, data: savedUser });
    } catch (error) {
      res.status(400).send({ error });
    }
  });

  // login route
  app.post("/api/user/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    // throw error when email is wrong
    if (!user) return res.status(400).send({ error: "Email is wrong" });
    // check for password correctness
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send({ error: "Password is wrong" });
    console.warn(user, "login");
    // create token
    const token = jwt.sign(
      // payload data
      {
        email: user.email,
        id: user._id,
        role: user.role,
        cretedDate: user.cretedDate,
      },
      TOKEN_SECRET
    );

    res.header("auth-token", token).json({
      error: false,
      data: {
        token,
      },
    });
  });

  // get user data by token
  app.get("/api/user/data", async (req, res) => {
    console.log(req.headers, "headers");
    if (req.headers && req.headers.authorization) {
      var authorization = req.headers.authorization,
        decoded;
      console.log(authorization, "token");
      try {
        decoded = verifyToken(authorization);
        return res.status(200).send(decoded);
      } catch (e) {
        return res.status(401).send("unauthorized");
      }
    }
  });

  // endpoint for update user by id
  app.put(`/api/user/:id`, async (req, res) => {
    const { id } = req.params;

    let user = await User.findByIdAndUpdate(id, req.body);

    return res.status(202).send({
      error: false,
      updateUserSucces: true,
      user,
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
