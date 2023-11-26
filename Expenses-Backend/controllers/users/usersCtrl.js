const bcrypt = require("bcryptjs");
const User = require("../../model/User");
const { AppErr, appErr } = require("../../utils/appErr");
const generateToken = require("../../utils/generateToken");
const verifyToken = require("../../utils/verifyToken");

const registerUserCtrl = async (req, res, next) => {
  try {
    const { fullname, password, email } = req.body;
    //check if email exist
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(appErr("User Already exist", 400));
    }
    //check if fiels are empty
    if (!email || !password || !fullname) {
      return res.json({ message: "Please provide all fields" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });
    res.json({
      status: "success",
      fullname: user.fullname,
      email: user.email,
      id: user._id,
    });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

const loginUserCtrl = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //check if email exist
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return next(new AppErr("Invalid Login Credentials", 400));
    }

    //check for password validity
    const isPasswordMatch = await bcrypt.compare(password, userFound.password);
    if (!isPasswordMatch) {
      return next(new AppErr("Invalid Login Credentials", 400));
    }
    res.json({
      status: "success",
      fullname: userFound.fullname,
      id: userFound._id,
      token: generateToken(userFound._id),
    });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

const profileUserCtrl = async (req, res) => {
  try {
    const user = await User.findById(req.user).populate({
      path: "accounts",
      populate: {
        path: "transactions",
        model: "Transaction",
      },
    });
    res.json(user);
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

const deleteUserCtrl = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

const updateUserCtrl = async (req, res, next) => {
  try {
    // if (req.body.email) {
    //   const userFound = await User.findOne({ email: req.body.email });
    //   if (userFound)
    //     return next(
    //       new AppErr("Email is taken or you already have this email", 400)
    //     );
    // }

    //check if user is updating the password
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      //update the user
      const user = await User.findByIdAndUpdate(
        req.user,
        {
          password: hashedPassword,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      //send the response
      return res.status(200).json({
        status: "success",
        data: user,
      });
    }

    const user = await User.findByIdAndUpdate(req.user, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};
module.exports = {
  registerUserCtrl,
  loginUserCtrl,
  profileUserCtrl,
  deleteUserCtrl,
  updateUserCtrl,
};
