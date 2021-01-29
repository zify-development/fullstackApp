const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const uploadFileSchema = mongoose.model("user_images");
const fs = require("fs");
const path = require("path");
const formidable = require("formidable");

const TOKEN_SECRET = "icoders_secret";

const verifyToken = (token) => {
  return jwt.verify(token, TOKEN_SECRET);
};

module.exports = (app) => {
  // endpoint for get images for user by id
  app.get("/api/user/image/:id", async (req, res) => {
    const { id } = req.params;
    //if (req.headers && req.headers.authorization) {
    /* let authorization = req.headers.authorization,
        decoded;
      const token = authorization.split(" ")[1]; */
    try {
      // decoded = verifyToken(token);
      const userImage = await uploadFileSchema.findOne({ _id: id });
      const rawData = fs.readFileSync(userImage.fileUrl);

      res.set("Content-Type", userImage.fileType);

      return res.status(200).send(rawData);
    } catch (e) {
      return res.status(401).send("unauthorized");
    }
    /* } else {
      return res.status(500).send("internal server error");
    } */
  });

  // endpoint for create user info by id
  app.post(`/api/user/image`, async (req, res) => {
    res.set("Content-Type", "multipart/form-data");

    if (req.headers && req.headers.authorization) {
      let authorization = req.headers.authorization,
        decoded;
      const token = authorization.split(" ")[1];
      try {
        decoded = verifyToken(token);

        const form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
          console.warn(files.image.path, "files");
          const oldPath = files.image.path;
          if (!fs.existsSync(`../backend/assets/${decoded.id}`)) {
            fs.mkdirSync(`../backend/assets/${decoded.id}`, {
              recursive: true,
            });
          }
          const newPath =
            path.join("../assets", `../backend/assets/${decoded.id}`) +
            "/" +
            files.image.name;
          console.warn(newPath, "path");
          const rawData = fs.readFileSync(oldPath);
          const reqBody = {
            fileName: files.image.name,
            fileSize: files.image.size,
            fileType: files.image.type,
            fileUrl: newPath,
            id: decoded.id,
          };

          fs.writeFile(newPath, rawData, async function (err) {
            if (err) console.log(err);
            const uploadFile = await uploadFileSchema.create(reqBody);
            return res.status(200).send({
              error: false,
              statusMessage: {
                type: "success",
                message: "Úspěšné nahrání obrázku",
              },
              uploadFile,
            });
          });
        });
      } catch (e) {
        return res.status(401).send("unauthorized");
      }
    } else {
      return res.status(500).send("internal server error");
    }
  });

  // // endpoint for update user blocked status with admin
  // app.put(`/api/user`, async (req, res) => {
  //   if (req.headers && req.headers.authorization) {
  //     let authorization = req.headers.authorization,
  //       decoded;
  //     const token = authorization.split(" ")[1];
  //     try {
  //       decoded = verifyToken(token);
  //       if (decoded.role === "admin") {
  //         await User.updateOne({ _id: req.body._id }, req.body);
  //         const user = await User.findOne({ _id: req.body._id });

  //         return res.status(200).send({
  //           error: false,
  //           statusMessage: {
  //             type: "success",
  //             message: "Změna byla úspěná",
  //           },
  //           user,
  //         });
  //       }
  //     } catch (e) {
  //       return res.status(401).send("unauthorized");
  //     }
  //   } else {
  //     return res.status(500).send("internal server error");
  //   }
  // });
};
