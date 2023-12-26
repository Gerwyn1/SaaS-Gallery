import express from "express";

import * as UserController from "../controllers/user.js";
// import { protect } from '../middleware/authMiddleware.js';
// import {ROLES_LIST} from "../config/roles_list.js";
// import {checkUserRole} from "../middleware/authMiddleware.js";
// import { requestVerificationCodeRateLimit } from "../middleware/rateLimitMiddleware.js";
// import {imageUpload} from "../middleware/mediaMiddleware.js";

const router = express.Router();

// register user
router.post('/', UserController.registerUser);

// login user
router.post('/auth', UserController.authUser);

// logout user
// router.post('/logout', protect, UserController.logoutUser);

// get user profile & update user profile
router
.route('/profile/:userId')
.get(UserController.getUserProfile);
// .patch(protect, checkUserRole(ROLES_LIST.editor, ROLES_LIST.admin, ROLES_LIST.user), imageUpload.fields([
//   { name: 'profile_image', maxCount: 1 },
//   { name: 'banner_image', maxCount: 1 },
// ]), UserController.updateUserProfile);


export default router;



// for image uploads...
// imageUpload.fields([
//   { name: 'profile_image', maxCount: 1 },
//   { name: 'banner_image', maxCount: 1 },
// ]),