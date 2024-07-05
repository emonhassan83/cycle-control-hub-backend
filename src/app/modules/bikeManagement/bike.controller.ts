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

const createSalesBike = catchAsync(async (req: Request, res: Response) => {
  const bike = await BikeServices.createSalesBikeIntoDB(
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
    message: 'Sales all bike retrieve successfully!',
    meta: result.meta,
    data: result.result,
  });
});

const getASaleBike = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const bike = await BikeServices.getASaleBikeIntoDB(id, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Seals bike retrieve successfully!',
    data: bike,
  });
});

const getSellerAllSaleBike = catchAsync(async (req: Request, res: Response) => {
  const result = await BikeServices.getSellerAllSaleBikeIntoDB(req.query, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Seller all seals bike retrieve successfully!',
    meta: result.meta,
    data: result.result,
  });
});

const updateASaleBike = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const bike = await BikeServices.updateASaleBikeIntoDB(
    id,
    req.body,
    req.user,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update a seals bike successfully!',
    data: bike,
  });
});

const deleteASaleBike = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const bike = await BikeServices.deleteASaleBikeIntoDB(id, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete a seals bike successfully!',
    data: bike,
  });
});

export const bikeControllers = {
  addBike,
  getAllBike,
  getSellerAllBike,
  updateABike,
  deleteABike,
  bulkDeleteBikes,

  createSalesBike,
  getSalesBike,
  getASaleBike,
  getSellerAllSaleBike,
  updateASaleBike,
  deleteASaleBike
};
