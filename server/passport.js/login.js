import passport from 'passport';
import asyncHandler from 'express-async-handler';
import createHttpError from 'http-errors'

// STEP 3
export const passportLogin = async (req, res, next) => {
  await passport.authenticate('local', asyncHandler(async (err, user) => {
    // err = err || 'Invalid Email or Password.';
    if (!user) return next(createHttpError(401, 'Invalid Email or Password.'));
    if (err) return next(createHttpError(401, 'Invalid Email or Password.'));
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.status(200).json({
        redirectTo: '/dashboard',
      });
    });
  }))(req, res, next);
};

// LOGOUT
export const clearCookies = async (response) => {
  console.log('log out endpoint')
  response.cookie('app-auth', '', {
    // httpOnly: true,
    expires: new Date(0),
  });
  response.cookie('app-auth.sig', '', {
    // httpOnly: true,
    expires: new Date(0),
  });
  response.status(200).json({message : 'You have logged out successfully.'});
 }