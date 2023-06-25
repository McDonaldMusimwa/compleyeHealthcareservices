const Schema = require("../models/user");
const bycrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const privateKey = process.env.PRIVATEKEY;

module.exports = {
  login: async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    const user = await Schema.User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          err.status = 404;
          throw err;
        }
        loadedUser = user;
        return bycrypt.compare(password, loadedUser.password);
      })
      .then((isEqual) => {
        if (!isEqual) {
          const error = new Error("Wrong password");
          error.status = 401;
          throw error;
        }
        const token = jwt.sign({email:loadedUser.email,userId:loadedUser._id.toString()},privateKey,{expiresIn:'1h'});
        res.status(200).json({token:token,userId:loadedUser._id.toString()})
        
      })
      .catch(
        (err = {
          if(err) {
            err.status = 500;
          },
        })
      );
  },
};
