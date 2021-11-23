const User = require('../models/User.model');
const crypto = require('crypto');
const jwt = require("jsonwebtoken");

let response = {
  msg: "",
  exito: false,
};


exports.login = function(req, res, next){
   
    let hashedPass = crypto.createHash("sha512").update(req.body.password).digest("hex");

    User.findOne({ user: req.body.user, password: hashedPass }, function(err, user){
        let response = {
            token: null
        }

        if (user !== null){
            response.token = jwt.sign({
                id: user._id,
                user: user.user
            }, "__secret__")
        }
        res.json(response);
    })

}

exports.register = function (req, res) {

    let hashedPass = crypto.createHash("sha512").update(req.body.password).digest("hex");
    
    let user = new User({
      user: req.body.user,
      password: hashedPass,
    });
  
    user.save(function (err) {
      if (err) {
        console.error(err);
        (response.exito = false), (response.msg = "Error al guardar");
        res.json(response);
        return;
      }
  
      (response.exito = true),
        (response.msg = "Se guardo correctamente");
      res.json(response);
    });
  };