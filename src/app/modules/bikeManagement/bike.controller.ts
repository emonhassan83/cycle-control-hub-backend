import { Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { BikeServices } from './bike.service';
import catchAsync from '../../utils/catchAsync';

const addBike = catchAsync(async (req: Request, res: Response) => {
  const bike = await BikeServices.createBikeIntoDB(req.body, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New bike added successfully!',
    data: bike,
  });
});

const createSalesBike = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const bike = await BikeServices.createSalesBikeIntoDB(id,
    req.body,
    req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sales bike added successfully!',
    data: bike,
  });
});

const getSalesBike = catchAsync(async (req: Request, res: Response) => {
  const result = await BikeServices.getAllSalesBikeIntoDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sales bike retrieve successfully!',
    meta: result.meta,
    data: result.result,
  });
});

const getAllBike = catchAsync(async (req: Request, res: Response) => {
  const result = await BikeServices.getAllBikeIntoDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get all bike retrieve successfully!',
    meta: result.meta,
    data: result.result,
  });
});

const getSellerAllBike = catchAsync(async (req: Request, res: Response) => {
  const result = await BikeServices.getAllSellerBikeIntoDB(req.query, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get seller all bike retrieve successfully!',
    meta: result.meta,
    data: result.result,
  });
});

const getABike = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const bike = await BikeServices.getABikeIntoDB(id, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike retrieve successfully!',
    data: bike,
  });
});

const updateABike = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const bike = await BikeServices.updateABikeIntoDB(
    id,
    req.body,
    req.user,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update a bike successfully!',
    data: bike,
  });
});

const deleteABike = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const bike = await BikeServices.deleteABikeIntoDB(id, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete a bike successfully!',
    data: bike,
  });
});

const bulkDeleteBikes = catchAsync(async (req: Request, res: Response) => {
  const bike = await BikeServices.bulkDeleteBikesIntoDB(req.body, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bulk delete bikes successfully!',
    data: bike,
  });
});

export const bikeControllers = {
  addBike,
  createSalesBike,
  getSalesBike,
  getAllBike,
  getSellerAllBike,
  getABike,
  updateABike,
  deleteABike,
  bulkDeleteBikes,
};
