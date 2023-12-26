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

// get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  // const user = await UserModel.findById(req.user._id);
  const user = await UserModel.findById(req.params.userId);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const authUser = asyncHandler(async (req, res,next) => {
console.log('first step of authentication - log in')

  passport.authenticate('local', (err,user) => {
    console.log('3. passport authentication')
    if (err) return next(err);
    if (!user) return res.status(401).json({message: 'Invalid email or password'});
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({
        ...user,
        redirectTo: '/dashboard',
        // token: generateToken(res, user._id)
      });
    })
  })(req,res, next)

});

export {
  registerUser,
  authUser,
  // getAllUsers,
  // logoutUser,
  // deleteUser,
  // getUserProfile,
  // updateUserProfile,
  // disableUser,
  // requestEmailVerificationCode,
  // verifyEmail,
  // requestResetPasswordCode,
  // resetPassword,
  // changePasswordExpiry,
  // isPasswordExpired
}