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


// auth user & get token (login)
const authUser = asyncHandler(async (req, res) => {
  const {
    email,
    password,
    username
  } = req.body;
  const existingUser = await UserModel.findOne({
    username
  });

  if (!existingUser) throw createHttpError(401, 'Invalid email or password');
  if (existingUser.is_disabled) throw createHttpError(403, "Your account has been suspended. Please contact support for more information.");

  if (await existingUser.matchPassword(password)) {
    const token = generateToken(res, existingUser._id);

    res.status(200).json({
      ...existingUser,
      token
    });
  } else throw createHttpError(401, 'Invalid email or password');
});

const authUser2 = asyncHandler(async (req, res,next) => {
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
  authUser,
  authUser2,
  // getAllUsers,
  // registerUser,
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