import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";

const registerUser: RequestHandler = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await UserService.registerUserIntoDB(userData);

  // send response
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  
  const result = await UserService.getAllUsersFromDB();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Users retrieved successfully!",
    data: result,
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

export const UserControllers = {
  registerUser,
  getAllUsers,
  getAUser,
};
