import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";
import { Request, Response } from "express";

const registerUser = catchAsync(async (req, res) => {
  const result = await UserService.registerUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully!",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserService.getAllUsersFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Users retrieved successfully!",
    meta: result.meta,
    data: result.result,
  });
});

const getMyProfile = catchAsync(async (req: Request & { user?: any }, res: Response) => {
  const result = await UserService.getMyProfileFromDB(req?.user);
  
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User retrieved successfully!",
    data: result,
  });
});

const changeUserRole = catchAsync(async (req, res) => {
  const result = await UserService.changeUserRoleFromDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User role update successfully!",
    data: result,
  });
});

const changeUserStatus= catchAsync(async (req, res) => {
  const result = await UserService.changeUserStatusFromDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User status update successfully!",
    data: result,
  });
});

const updateUserInfo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.updateUserInfoFromDB(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User info update successfully!",
    data: result,
  });
});

const softDeleteAUser= catchAsync(async (req, res) => {
  const result = await UserService.userSoftDeleteFromDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User soft delete successfully!",
    data: result,
  });
});

const deleteAUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.deleteAUserFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User delete successfully!",
    data: result,
  });
});

export const UserControllers = {
  registerUser,
  getAllUsers,
  getMyProfile,
  changeUserRole,
  changeUserStatus,
  updateUserInfo,
  softDeleteAUser,
  deleteAUser,
};
