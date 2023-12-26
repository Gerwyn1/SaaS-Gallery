// import crypto from "crypto";
import asyncHandler from 'express-async-handler';
// import bcrypt from 'bcryptjs';
import createHttpError from "http-errors";
import passport from 'passport';

import UserModel from '../models/User.js';
// import generateToken from '../utils/generateToken.js';
// import * as Email from "../utils/email.js";
// import EmailVerificationToken from "../models/emailVerificationToken.js";
// import PasswordResetToken from "../models/passwordResetToken.js";
// import {
//   userSchema
// } from "../models/user.js";
// import convertImagePath from "../utils/convertImagePath.js";

// register a new user
const registerUser = asyncHandler(async (req, res) => {
  const {
  email, password, confirmPassword, name
  } = req.body;
  await UserModel.checkRegisterFields(email, password, confirmPassword);
  await UserModel.emailAlreadyExists(email);
  await UserModel.confirmPassword(password, confirmPassword);
  await UserModel.validateFields(email, password);
  const newUser = await UserModel.create({email, password,name});
 res.status(201).json(newUser);
});

// login user
const authUser = asyncHandler(async(req, res,next) => {
  console.log('step 1: login controller');
    await passport.authenticate('local', asyncHandler(async(err,user) => {
      console.log('step 3: passport authentication');
      if (!user) return next(createHttpError(401, err));
      if (err) return next(createHttpError(401, err));
      req.logIn(user, (err) => {
        if (err) return next(err);
        return res.status(200).json({
          redirectTo: '/dashboard',
        });
      })
    }))(req,res, next)
  });

// get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  const {userId} = req.params;
  const user = await UserModel.findById(userId);
  if (!user) throw createHttpError(404, 'User not found.')
  res.status(200).json(user);
});

export {
  registerUser,
  authUser,
  getUserProfile,
  // getAllUsers,
  // logoutUser,
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