import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local'
import cookieSession from "cookie-session";
import asyncHandler from "express-async-handler";
import createHttpError from "http-errors";

import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
import userRoutes from './routes/user.js';

// data imports
import UserModel from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "./data/index.js";
import {notFound, errorHandler} from './middleware/errorMiddleware.js';

/* CONFIGURATION */
dotenv.config();
const app = express();

app.use(cookieSession({
  name: process.env.COOKIE_NAME,
  keys: [process.env.COOKIE_KEY_NEW, process.env.COOKIE_KEY_OLD],
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  secure: process.env.NODE_ENV === 'production', // Set to true in production
  httpOnly: true,
  sameSite: 'strict', // or 'lax' or 'none' (requires secure: true)
}))

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// PASSPORT SERIALIZE USER (STEP 4)
passport.serializeUser((user, done) => done(null, user._id));

// PASSPORT DESERIALIZE USER (STEP 5)
passport.deserializeUser(asyncHandler(async (id, done) => {
  const user = await UserModel.findById(id);
  if (!user) return done(createHttpError(404, 'User not found.'));
  return done(null, {id: user._id, email: user.email});
}));

// PASSPORT STRATEGY (LOGIN) (STEP 2)
passport.use('local', new LocalStrategy({usernameField: 'email',passReqToCallback : true},
asyncHandler(async(req, email, password, done) => {
  const user =  await UserModel.findOne({email});
  if (!user) return done('Invalid Email or Password.', false);
  const passwordMatch = await user.matchPassword(password, user.password);
  if (!passwordMatch) return done('Invalid Email or Password.', null);
  return done(null, user);
})));

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ONLY ADD DATA ONE TIME */
    // AffiliateStat.insertMany(dataAffiliateStat);
    // OverallStat.insertMany(dataOverallStat);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // User.insertMany(dataUser);
  })
  .catch((error) => console.log(`${error} did not connect`));
