import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      // required: [true, 'Username is required.'],
      // unique: true
    },
    first_name: {
      type: String,
      // required: true
    },
    last_name: {
      type: String,
      // required: true
    },
    name: {
      type: String,
      required: true,
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
      min: 5,
    },
    repeatPassword: {
      type: String,
      // required: [true, 'Repeat password is required.'],
    },
    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    transactions: Array,
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "admin",
    },
    // roles: {
    //   type: [String],
    //   default: ['user'],
    //   enum: ['user', 'admin', 'superadmin']
    //   default: 'admin'
    // },
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
      // required: true
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
      // required: [true, 'Profile image is required.'],
    },
    banner_image: {
      type: String,
      // required: [true, 'Banner image is required.'],
    }
  },
  { timestamps: true }
);

// Match user entered password to hashed password in database
// UserSchema.methods.matchPassword = async function (enteredPassword) {
//   console.log('match password?')
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// Check if the entered password matches any previous passwords or the current password
// UserSchema.methods.checkPasswordHistory = async function (enteredPassword) {
//   return await this.passwordHistory.some((prevPassword) => bcrypt.compareSync(enteredPassword, prevPassword));
// };

// Encrypt password using bcrypt
// UserSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     next();
//   }

//   // if modified or creating pw
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);

//   // store hashed password in history
//   this.passwordHistory.push(this.password);
// });


const User = mongoose.model("Customer", UserSchema);
export default User;
