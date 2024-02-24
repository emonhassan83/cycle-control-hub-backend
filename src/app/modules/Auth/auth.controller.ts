import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import { RequestHandler } from "express";

const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { token, user } = result;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User login successful",
    data: {
    user,
    token,
    },
  });
});

export const AuthControllers = {
  loginUser,
};
