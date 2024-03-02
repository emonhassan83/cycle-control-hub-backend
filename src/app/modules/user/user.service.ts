/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { createToken } from '../Auth/auth.utils';
import { TUser } from './user.interface';
import { User } from './user.model';
import QueryBuilder from '../../builder/QueryBuilder';

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

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const usersQuery = new QueryBuilder(User.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

    const result = await usersQuery.modelQuery;
    const meta = await usersQuery.countTotal();

  if (!usersQuery) {
    throw new AppError(httpStatus.NOT_FOUND, "Users not found!");
  }
  return {
    meta,
    result,
  };
}


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
    throw new AppError(httpStatus.NOT_FOUND, "User not found and failed to update!");
  }

  return updatedUser;
};

const deleteAUserFromDB = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  const deleteUser = await User.findByIdAndDelete(userId);
  if (!deleteUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found and failed to delete!");
  }

  return deleteUser;
};

export const UserService = {
  registerUserIntoDB,
  getAllUsersFromDB,
  getAUserFromDB,
  changeUserRoleFromDB,
  updateUserInfoFromDB,
  deleteAUserFromDB,
};
