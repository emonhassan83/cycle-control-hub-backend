import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { ServiceCategoryService } from "./serviceCategory.service";

const createBikeServiceCategory = catchAsync(async (req, res) => {
  const category = req.body;
  const result = await ServiceCategoryService.createBikeServiceCategoryIntoDB(category);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Bike service category create successfully!",
    data: result,
  });
});

const getAllBikeServiceCategories = catchAsync(async (req, res) => {
  const result = await ServiceCategoryService.getAllBikeServiceCategoriesFromDB();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Bike all service categories retrieved successfully!",
    data: result,
  });
});

const getABikeServiceCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceCategoryService.getABikeServiceCategoryFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Bike service category retrieved successfully!",
    data: result,
  });
});

const updateBikeServiceCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const categoryData = req.body;
  const result = await ServiceCategoryService.updateBikeServiceCategoryFromDB(id, categoryData);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Bike service category update successfully!",
    data: result,
  });
});

const deleteABikeServiceCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceCategoryService.deleteABikeServiceCategoryFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Bike service category delete successfully!",
    data: result,
  });
});

export const ServiceCategoryControllers = {
  createBikeServiceCategory,
  getAllBikeServiceCategories,
  getABikeServiceCategory,
  updateBikeServiceCategory,
  deleteABikeServiceCategory,
};
