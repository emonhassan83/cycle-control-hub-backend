import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductServices } from "./bikeProduct.service";

const addProduct = catchAsync(async (req, res) => {
    const product = await ProductServices.createProductIntoDB(req.body, req.user);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'New product added successfully!',
      data: product,
    });
  });

  const getAllProduct = catchAsync(async (req, res) => {
    const result = await ProductServices.getAllBikeProductIntoDB(req.query);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get all product retrieve successfully!',
      meta: result.meta,
      data: result.result,
    });
  });

  const getSellerAllProduct = catchAsync(async (req, res) => {
    const result = await ProductServices.getAllSellerProductIntoDB(req.query, req.user);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get seller all product retrieve successfully!',
      meta: result.meta,
      data: result.result,
    });
  });

  const getAProduct = catchAsync(async (req, res) => {
    const { id } = req.params;
    const product = await ProductServices.getAProductIntoDB(id, req.user);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product retrieve successfully!',
      data: product,
    });
  });

  const updateAProduct = catchAsync(async (req, res) => {
    const { id } = req.params;
    const product = await ProductServices.updateAProductIntoDB(
      id,
      req.body,
      req.user,
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Update a product successfully!',
      data: product,
    });
  });

  const deleteAProduct = catchAsync(async (req, res) => {
    const { id } = req.params;
    const product = await ProductServices.deleteAProductIntoDB(id, req.user);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Delete a product successfully!',
      data: product,
    });
  });

  export const productControllers = {
    addProduct,
    getAllProduct,
    getSellerAllProduct,
    getAProduct,
    updateAProduct,
    deleteAProduct
  };