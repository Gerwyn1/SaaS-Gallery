import passport from 'passport';
import asyncHandler from 'express-async-handler';

// STEP 3
export const passportLogin = async (req, res, next) => {
  await passport.authenticate('local', asyncHandler(async (err, user) => {
    if (!user) return next(createHttpError(401, err));
    if (err) return next(createHttpError(401, err));
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
  response.cookie('app-auth', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  response.cookie('app-auth.sig', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  response.status(200).json({message : 'You have logged out successfully.'});
 }