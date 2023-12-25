import express from "express";

import * as UserController from "../controllers/user.js";
// import { protect } from '../middleware/authMiddleware.js';
// import {ROLES_LIST} from "../config/roles_list.js";
// import {checkUserRole} from "../middleware/authMiddleware.js";
// import { requestVerificationCodeRateLimit } from "../middleware/rateLimitMiddleware.js";
// import {imageUpload} from "../middleware/mediaMiddleware.js";

const router = express.Router();

// register user
// router.post('/', imageUpload.fields([
//   { name: 'profile_image', maxCount: 1 },
//   { name: 'banner_image', maxCount: 1 },
// ]),  UserController.registerUser);

// login user
router.post('/auth', UserController.authUser2);


// logout user
// router.post('/logout', protect, UserController.logoutUser);


export default router;