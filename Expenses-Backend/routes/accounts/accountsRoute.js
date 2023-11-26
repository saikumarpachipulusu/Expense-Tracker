const express = require("express");
const {createAccountCtrl,
  getAccountCtrl,
  deleteAccountCtrl,
  updateAccountCtrl,
  getAccountsCtrl}=require("../../controllers/accounts/accountsCtrl");
const isLogin = require("../../middlewares/isLogin");
const accountsRoute = express.Router();

accountsRoute.post("/", isLogin,createAccountCtrl);

accountsRoute.get("/", getAccountsCtrl);

accountsRoute.get("/:id", getAccountCtrl);

accountsRoute.delete("/:id", deleteAccountCtrl);

accountsRoute.put("/:id", updateAccountCtrl);

module.exports = accountsRoute;
