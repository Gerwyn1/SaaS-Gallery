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
import bcrypt from 'bcryptjs'

import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
import userRoutes from './routes/user.js';

import UserModel from "./models/User.js";

// data imports
import User from "./models/User.js";
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

/* CONFIGURATION */
dotenv.config();
const app = express();

app.use(cookieSession({
  name: process.env.COOKIE_NAME,
  keys: [process.env.COOKIE_KEY_NEW, process.env.COOKIE_KEY_OLD],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// PASSPORT SERIALIZE USER
passport.serializeUser((user, done) => {
  console.log(`4: serialize user: ${JSON.stringify(user)}`);
  return done(null, user.id);
});

// PASSPORT STRATEGY
passport.use('local', new LocalStrategy({usernameField: 'email',passReqToCallback : true},
async (req, email, password, done) => {
  console.log('2:local strategy verify cb');
  const user =  await UserModel.findOne({email});
  console.log(user)

  if (!user) return done(null, false);
  const result = await new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) reject(err);
      resolve(result);
    })
  });

  console.log('result->>', result);

  // return done(null, {id: 'test'})
}));

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
