import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { CouponService } from "./coupon.service";

const createCoupon = catchAsync(async (req, res) => {
  const coupon = req.body;
  const result = await CouponService.createCouponIntoDB(coupon);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Coupon create successfully!",
    data: result,
  });
});

const getAllCoupons = catchAsync(async (req, res) => {
  const result = await CouponService.getAllCouponFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Coupons retrieved successfully!",
    meta: result.meta,
    data: result.result,
  });
});

const getACoupon = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CouponService.getACouponFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Coupon retrieved successfully!",
    data: result,
  });
});

const updateCoupon = catchAsync(async (req, res) => {
  const { id } = req.params;
  const couponData = req.body;
  const result = await CouponService.updateCouponFromDB(id, couponData);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Coupon update successfully!",
    data: result,
  });
});

const deleteACoupon = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CouponService.deleteACouponFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Coupon delete successfully!",
    data: result,
  });
});

export const CouponControllers = {
  createCoupon,
  getAllCoupons,
  getACoupon,
  updateCoupon,
  deleteACoupon,
};
