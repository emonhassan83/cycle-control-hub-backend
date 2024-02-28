/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { createToken } from '../Auth/auth.utils';
import { TUser } from './user.interface';
import { User } from './user.model';

const registerUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);

  //* create token and sent to the  client
  const jwtPayload = {
    _id: result._id,
    email: result.email,
    role: result.role,
  };

  const userData = {
    ...jwtPayload,
    username: result.username,
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    user: userData,
    token,
  };
};

const getAllUsersFromDB = async () => {
  const users = await User.find();
  if (!users) {
    throw new AppError(httpStatus.NOT_FOUND, "Users not found!");
  }
  return users;
};

const getAUserFromDB = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  return user;
};

const changeUserRoleFromDB = async (payload: any) => {
  const { userId, role } = payload;

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }
  
  const updateUserRole = await User.findByIdAndUpdate(
    userId,
    { role },
    { new: true },
  );

  if (!updateUserRole) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found and failed to update role!");
  }
  return updateUserRole;
};

const updateUserInfoFromDB = async (userId: string, payload: any) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  const updatedUser = await User.findByIdAndUpdate(userId, payload, { new: true });
  if (!updatedUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found and failed to update role!");
  }

  return updatedUser;
};

export const UserService = {
  registerUserIntoDB,
  getAllUsersFromDB,
  getAUserFromDB,
  changeUserRoleFromDB,
  updateUserInfoFromDB,
};
