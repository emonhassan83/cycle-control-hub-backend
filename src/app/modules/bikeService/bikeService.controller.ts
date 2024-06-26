import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { ServiceHistoryService } from "./bikeService.service";

const requestAService = catchAsync(async (req, res) => {
  const coupon = req.body;
  const user = req.user;
  const result = await ServiceHistoryService.requestAServiceIntoDB(user, coupon);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Bike service request successfully!",
    data: result,
  });
});

const confirmAService = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result = await ServiceHistoryService.confirmAServiceIntoDB(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Confirm a bike service successfully!",
    data: result,
  });
});

const cancelAService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceHistoryService.cancelAServiceIntoDB(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Cancel a bike service successfully!",
    data: result,
  });
});

const getAllServices = catchAsync(async (req, res) => {
  const result = await ServiceHistoryService.getAllServicesFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Get all services retrieved successfully!",
    meta: result.meta,
    data: result.result,
  });
});

const getMyServices = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await ServiceHistoryService.getMyServicesFromDB(req.query, user);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Get my all services retrieved successfully!",
    meta: result.meta,
    data: result.result,
  });
});

const getAService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceHistoryService.getAServiceFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Get a service retrieved successfully!",
    data: result,
  });
});

const applyCouponAService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceHistoryService.applyCouponAServiceFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Apply Coupon in a service successfully!",
    data: result,
  });
});

const paymentAService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceHistoryService.paymentAServiceFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Payment a service retrieved successfully!",
    data: result,
  });
});

const updateAService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const service = req.body;
  const result = await ServiceHistoryService.updateAServiceFromDB(id, service);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Bike service update successfully!",
    data: result,
  });
});

const deleteAService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceHistoryService.deleteAServiceFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Bike service delete successfully!",
    data: result,
  });
});

export const ServiceHistoryControllers = {
  requestAService,
  confirmAService,
  cancelAService,
  getAllServices,
  getMyServices,
  getAService,
  applyCouponAService,
  paymentAService,
  updateAService,
  deleteAService
};
