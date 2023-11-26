const express = require("express");
const {registerUserCtrl,
  loginUserCtrl,
  profileUserCtrl,
  deleteUserCtrl,
  updateUserCtrl}=require("../../controllers/users/usersCtrl");
const isLogin = require("../../middlewares/isLogin");
const usersRoute = express.Router();

usersRoute.post("/register", registerUserCtrl);

usersRoute.post("/login", loginUserCtrl);

usersRoute.get("/profile",isLogin, profileUserCtrl);

usersRoute.delete("/",isLogin, deleteUserCtrl);

usersRoute.put("/",isLogin, updateUserCtrl);

//accounts

module.exports = usersRoute;
