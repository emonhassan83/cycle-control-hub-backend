import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";

const registerUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await UserService.registerUserIntoDB(userData);

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

const getAUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.getAUserFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User retrieved successfully!",
    data: result,
  });
});

const changeUserRole = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await UserService.changeUserRoleFromDB(userData);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User role update successfully!",
    data: result,
  });
});

const updateUserInfo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  const result = await UserService.updateUserInfoFromDB(id, userData);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User info update successfully!",
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
  getAUser,
  changeUserRole,
  updateUserInfo,
  deleteAUser,
};
