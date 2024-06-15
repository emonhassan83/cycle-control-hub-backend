/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { createToken } from '../Auth/auth.utils';
import { TReqUser, TUser } from './user.interface';
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

  // const userData = {
  //   ...jwtPayload,
  //   username: result.username,
  // };

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
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
    throw new AppError(httpStatus.NOT_FOUND, 'Users not found!');
  }

  return {
    meta,
    result,
  };
};

const getMyProfileFromDB = async (user: TReqUser) => {
  const UserData = await User.findOne({ email: user.email });
  if (!UserData) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  return UserData;
};

const changeUserRoleFromDB = async (payload: any) => {
  const { userId, role } = payload;

  //* if the user is is not exist
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  //* checking if the user is already deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  //* checking if the user is blocked
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  const updateUserRole = await User.findByIdAndUpdate(
    userId,
    { role },
    { new: true },
  );

  if (!updateUserRole) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'User not found and failed to update role!',
    );
  }
  return updateUserRole;
};

const changeUserStatusFromDB = async (payload: any) => {
  const { userId, status } = payload;

  //* if the user is is not exist
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  //* checking if the user is already deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  const updateUserStatus = await User.findByIdAndUpdate(
    userId,
    { status },
    { new: true },
  );

  if (!updateUserStatus) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'User not found and failed to update status!',
    );
  }
  return updateUserStatus;
};

const updateUserInfoFromDB = async (userId: string, payload: any) => {
   //* if the user is is not exist
   const user = await User.findById(userId);
   if (!user) {
     throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
   }
 
   //* checking if the user is already deleted
   const isDeleted = user?.isDeleted;
   if (isDeleted) {
     throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
   }
 
   //* checking if the user is blocked
   const userStatus = user?.status;
   if (userStatus === 'blocked') {
     throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
   }

  const updatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
  });
  if (!updatedUser) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'User not found and failed to update!',
    );
  }

  return updatedUser;
};

const userSoftDeleteFromDB = async (payload: {userId: string, isDeleted: string}) => {
  //* if the user is is not exist
  const user = await User.findById(payload.userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const deleteUserStatus = await User.findByIdAndUpdate(
    payload.userId,
    { isDeleted: payload.isDeleted },
    { new: true },
  );

  if (!deleteUserStatus) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'User not found and failed to update status!',
    );
  }
  return deleteUserStatus;
};

const deleteAUserFromDB = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const deleteUser = await User.findByIdAndDelete(userId);
  if (!deleteUser) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'User not found and failed to delete!',
    );
  }

  return deleteUser;
};

export const UserService = {
  registerUserIntoDB,
  getAllUsersFromDB,
  getMyProfileFromDB,
  changeUserRoleFromDB,
  changeUserStatusFromDB,
  updateUserInfoFromDB,
  userSoftDeleteFromDB,
  deleteAUserFromDB,
};
