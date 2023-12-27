// import crypto from "crypto";
import asyncHandler from 'express-async-handler';
import createHttpError from "http-errors";
import UserModel from '../models/User.js';
import { passportLogin, clearCookies } from '../passport.js/login.js';
// import generateToken from '../utils/generateToken.js';
// import * as Email from "../utils/email.js";
// import EmailVerificationToken from "../models/emailVerificationToken.js";
// import PasswordResetToken from "../models/passwordResetToken.js";
// import {
//   userSchema
// } from "../models/user.js";
// import convertImagePath from "../utils/convertImagePath.js";

// REGISTER (STEP 1)
const registerUser = asyncHandler(async (req, res, next) => {
  const {
  email, password, confirmPassword, name
  } = req.body;
  await UserModel.checkRegisterFields(email, password, confirmPassword);
  await UserModel.emailAlreadyExists(email);
  await UserModel.confirmPassword(password, confirmPassword);
  await UserModel.validateFields(email, password);

  // AND LOGIN USER
  const newUser = await UserModel.create({email, password,name});
  req.email = newUser.email;
  req.password = newUser.password;
  passportLogin(req, res, next);
});

// LOGIN USER (STEP 1)
const authUser = asyncHandler(async(req, res,next) => passportLogin(req, res, next));

  // LOGOUT USER
const logoutUser = async (req, res, next) =>  await clearCookies(res);

// GET USER PROFILE
const getUserProfile = asyncHandler(async (req, res) => {
  const {userId} = req.params;
  const user = await UserModel.findById(userId);
  if (!user) throw createHttpError(404, 'User not found.')
  res.status(200).json(user);
});

export {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  // getAllUsers,
  // deleteUser,
  // updateUserProfile,
  // disableUser,
  // requestEmailVerificationCode,
  // verifyEmail,
  // requestResetPasswordCode,
  // resetPassword,
  // changePasswordExpiry,
  // isPasswordExpired
}