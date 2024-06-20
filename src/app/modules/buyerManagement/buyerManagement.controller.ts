import { Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { BuyerServices } from './buyerManagement.service';
import catchAsync from '../../utils/catchAsync';

const purchaseBike = catchAsync(async (req: Request, res: Response) => {
  const bike = await BuyerServices.purchaseBikeIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New bike purchase successfully!',
    data: bike,
  });
});

const viewPurchaseBike = catchAsync(async (req: Request, res: Response) => {
  const result = await BuyerServices.viewPurchaseBikeIntoDB(req.query, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get buyer all purchase bike retrieved successfully!',
    meta: result.meta,
    data: result.result,
  });
});

const viewAllPurchaseBike = catchAsync(async (req: Request, res: Response) => {
  const result = await BuyerServices.viewAllPurchaseBikeIntoDB(req.query, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get buyer all purchase bike retrieved successfully!',
    meta: result.meta,
    data: result.result,
  });
});

const confirmPurchaseBike = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const bike = await BuyerServices.confirmPurchaseBikeIntoDB(req.user, id);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike purchase confirmed successfully!',
    data: bike,
  });
});

const cancelPurchaseBike = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const bike = await BuyerServices.cancelPurchaseBikeIntoDB(req.user, id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cancel purchase bike successfully!',
    data: bike,
  });
});

const viewDailySales = catchAsync(async (req: Request, res: Response) => {
  const dailySales = await BuyerServices.generateDailyReport(); 

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Daily sales report generated successfully!',
    data: dailySales,
  });
});

const viewWeeklySales = catchAsync(async (req: Request, res: Response) => {
  const weeklySales = await BuyerServices.generateWeeklyReport(); 

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Weekly sales report generated successfully!',
    data: weeklySales,
  });
});

const viewMonthlySales = catchAsync(async (req: Request, res: Response) => {
  const monthlySales = await BuyerServices.generateMonthlyReport(); 

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Monthly sales report generated successfully!',
    data: monthlySales,
  });
});

const viewYearlySales = catchAsync(async (req: Request, res: Response) => {
  const yearlySales = await BuyerServices.generateYearlyReport(); 

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Yearly sales report generated successfully!',
    data: yearlySales,
  });
});

export const buyerControllers = {
  purchaseBike,
  viewPurchaseBike,
  viewAllPurchaseBike,
  confirmPurchaseBike,
  cancelPurchaseBike,
  viewDailySales,
  viewWeeklySales,
  viewMonthlySales,
  viewYearlySales
};
