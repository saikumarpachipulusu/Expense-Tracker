const express = require("express");
const {
  createTransactionCtrl,
  getTransactionsCtrl,
  getTransactionCtrl,
  deleteTransactionCtrl,
  updateTransactionCtrl,
} = require("../../controllers/transactions/transactionsCtrl");
const isLogin = require("../../middlewares/isLogin");
const transactionsRoute = express.Router();

transactionsRoute.post("/", isLogin, createTransactionCtrl);

transactionsRoute.get("/", getTransactionsCtrl);

transactionsRoute.get("/:id", getTransactionCtrl);

transactionsRoute.delete("/:id", deleteTransactionCtrl);

transactionsRoute.put("/:id", updateTransactionCtrl);

module.exports = transactionsRoute;
