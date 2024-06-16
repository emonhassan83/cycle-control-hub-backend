/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import config from '../../config';
import { GenderOptions, UserRoleStatus, UserStatus } from './user.constant';
import { TUser, UserModel } from './user.interface';
import { Schema, model } from 'mongoose';

const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      default: null,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
      default: new Date(),
    },
    role: {
      type: String,
      enum: UserRoleStatus,
      default: "user"
    },
    status: {
      type: String,
      enum: UserStatus,
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      enum: GenderOptions,
      default: 'unknown',
    },
  },
  {
    timestamps: true,
  },
);

//* pre save middleware / hooks
userSchema.pre('save', async function (next) {
  const user = this; //* this refers to document
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.pre('save', async function (next) {
  const isUserExist = await User.findOne({
    email: this.email,
  });

  if (isUserExist) {
    throw new Error(
      'This user is already exist, changes email if you create new user',
    );
  }

  next();
});

userSchema.statics.isUserExistsByUserEmail = async function (email: string) {
  return await User.findOne({ email });
};

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email });
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);
