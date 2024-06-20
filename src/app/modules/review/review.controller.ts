import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { ReviewServices } from "./review.service";

const createReview = catchAsync(async (req, res) => {
  const result = await ReviewServices.createReviewIntoDB(req.body, req.user);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Review create successfully!",
    data: result,
  });
});

const getAllReview = catchAsync(async (req, res) => {
  const result = await ReviewServices.getAllReviewIntoDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "All review retrieved successfully!",
    meta: result.meta,
    data: result.result,
  });
});

const getAReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ReviewServices.getAReviewIntoDB(id, req.user);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Review retrieved successfully!",
    data: result,
  });
});

const updateReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ReviewServices.updateAReviewIntoDB(id, req.body, req.user);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Review update successfully!",
    data: result,
  });
});

const deleteAReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ReviewServices.deleteAReviewIntoDB(id, req.user);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Review delete successfully!",
    data: result,
  });
});

export const ReviewControllers = {
    createReview,
    getAllReview,
    getAReview,
    updateReview,
    deleteAReview,
};
