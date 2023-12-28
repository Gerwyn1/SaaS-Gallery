import mongoose from "mongoose";
import validator from "validator";
import createHttpError from "http-errors";
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    name: {
      type: String,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },
    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    transactions: Array,
    roles: {
      type: [String],
      default: ['user'],
      enum: ['user', 'admin', 'superadmin'],
    },
    postcode: {
      type: String,
      minLength: 6,
      maxLength: 10
    },
    is_disabled: {
      type: Boolean,
      default: false
    },
    is_verified: {
      type: Boolean,
      default: false
    },
    passwordExpiresAt: {
      type: Date,
      default: new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000), // 3 months ahead
    },
    setting: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Setting',
      // required: true,
    },
    passwordHistory : {
      type: [String],
      default: []
    },
    mobile_no: Number,
    address_1: String,
    address_2: String,
    company_name: String,
    country: String,
    profile_image: {
      type: String,
      default: null
    },
    banner_image: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

// REGISTER FUNCTIONS:
UserSchema.statics.checkRegisterFields = function(email, password, confirmPassword) {
 if (!email || !password || !confirmPassword) {
    throw createHttpError(400, 'Missing required fields');
  }
}

UserSchema.statics.emailAlreadyExists = async function(email) {
    const user = await this.findOne({email});
    if (user) throw createHttpError(400, 'Email already exists.');
}

UserSchema.statics.validateFields = async function(email, password) {
  if (!validator.isEmail(email)) throw createHttpError(400, 'Email already taken.');
  if (!validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })) throw createHttpError(400, 'Password strength too weak.');
}

UserSchema.statics.confirmPassword = async function(password, confirmPassword) { 
  if (password !== confirmPassword) throw createHttpError(400, 'Confirm password must match.');
}

// Encrypt password using bcrypt (upon registration)
UserSchema.pre('save', async function (next) {
  // if modified or creating pw
  if (!this.isModified('password')) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.passwordHistory.push(this.password);
});

// LOGIN FUNCTIONS:

// Match user entered password to hashed password in database (login)
UserSchema.methods.matchPassword = async function (enteredPassword, userPassword) {
  return await bcrypt.compare(enteredPassword, userPassword);
};

// Check if the entered password matches any previous passwords or the current password
// UserSchema.methods.checkPasswordHistory = async function (enteredPassword) {
//   return await this.passwordHistory.some((prevPassword) => bcrypt.compareSync(enteredPassword, prevPassword));
// };

const User = mongoose.model("Customer", UserSchema);
export default User;