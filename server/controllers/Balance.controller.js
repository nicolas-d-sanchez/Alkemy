const Balance = require("../models/Balance.model");
let response = {
  msg: "",
  exito: false,
};

exports.create = function (req, res) {

  let balance = new Balance({
    concept: req.body.concept,
    amount: req.body.amount,
    date: req.body.date,
    type: req.body.type,
  });

  balance.save(function (err) {
    if (err) {
      // console.error(err);
      (response.exito = false), (response.msg = "Error al guardar");
      res.json(response);
      return;
    }

    (response.exito = true),
      (response.msg = "Se guardo correctamente");
    res.json(response);
  });
};

exports.find = function (req, res) {
    Balance.find(function (err, balance) {
    res.json(balance);
  });
};

exports.findOne = function (req, res) {
    Balance.findOne({ _id: req.params.id }, function (err, balance) {
    res.json(balance);
  });
};

exports.update = function (req, res) {
  let balance = {
    concept: req.body.concept,
    amount: req.body.amount,
    date: req.body.date,
  };

  Balance.findByIdAndUpdate(req.params.id, { $set: balance }, function (err) {
    if (err) {
      console.error(err);
      (response.exito = false), (response.msg = "Error al editar");
      res.json(response);
      return;
    }

    (response.exito = true),
      (response.msg = "Se edito correctamente");
    res.json(response);
  });
};

exports.remove = function (req, res) {
  Balance.findByIdAndRemove({ _id: req.params.id }, function (err) {
    if (err) {
      console.error(err);
      (response.exito = false), (response.msg = "Error al eliminar");
      res.json(response);
      return;
    }

    (response.exito = true),
      (response.msg = "Se elimino correctamente");
    res.json(response);
  });
};
