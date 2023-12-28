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
  const newUser = await UserModel.create({email, password});
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

// UPDATE USER PROFILE
const updateUserProfile = asyncHandler(async (req, res) => {
  const {
    first_name,
    last_name,
    password,
    roles,
    email,
    country,
    state,
    occupation,
    phoneNumber,
    postcode,
    is_verified,
    mobile_no,
    address_1,
    address_2,
    company_name,
    profile_image,
    banner_image,
  } = req.body;

  const user = await UserModel.findById(req.user._id);

  if (user) {
    user.first_name = first_name || user.first_name;
    user.last_name = last_name || user.last_name;
    user.password = password || user.password;
    user.roles = [roles] || user.roles;
    user.email = email || user.email;
    user.country = country || user.country;
    user.state = state || user.state;
    user.occupation = occupation || user.occupation;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.postcode = postcode || user.postcode;
    user.is_verified = is_verified || user.is_verified;
    user.mobile_no = mobile_no || user.mobile_no;
    user.address_1 = address_1 || user.address_1;
    user.address_2 = address_2 || user.address_2;
    user.company_name = company_name || user.company_name;
    user.profile_image = profile_image || user.profile_image;
    user.banner_image = banner_image || user.banner_image;

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  // getAllUsers,
  // deleteUser,
  // disableUser,
  // requestEmailVerificationCode,
  // verifyEmail,
  // requestResetPasswordCode,
  // resetPassword,
  // changePasswordExpiry,
  // isPasswordExpired
}