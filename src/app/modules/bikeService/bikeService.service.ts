/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ServiceHistory } from './bikeService.model';
import { TServiceHistory } from './bikeService.interface';
import { Buyer } from '../buyerManagement/buyerManagement.model';
import { ServiceCategory } from '../bikeServiceCategory/serviceCategory.model';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../user/user.model';
import { Coupon } from '../coupon/coupon.model';

const requestAServiceIntoDB = async (
  userData: JwtPayload,
  payload: TServiceHistory,
) => {
  const { bike, service } = payload;

  //* Check if the bike dose not exists
  const purchaseBike = await Buyer.findOne({ _id: bike });
  if (!purchaseBike) {
    throw new AppError(
      httpStatus.CONFLICT,
      `You can only request service in purchase bike`,
    );
  }

  //* Check if the bike dose not exists
  const bikeService = await ServiceCategory.findOne({ _id: service });
  if (!bikeService) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This bike service is not available`,
    );
  }
  const serviceProvider = bikeService.serviceProvider;
  const serviceReceiver = userData._id;
  const serviceBill = bikeService?.price;

  const serviceData = {
    ...payload,
    serviceProvider,
    serviceReceiver,
    serviceBill,
  };

  const result = await ServiceHistory.create(serviceData);
  if (!result) {
    throw new AppError(httpStatus.CONFLICT, 'Service request is not created!');
  }

  return result;
};

const confirmAServiceIntoDB = async (serviceId: string) => {
  const bikeService = await ServiceHistory.findOne({ _id: serviceId });
  if (!bikeService) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found!');
  }

  const confirmService = await ServiceHistory.findByIdAndUpdate(
    serviceId,
    { isConfirmed: true },
    { new: true },
  );

  if (!confirmService) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Service not found and failed to update!',
    );
  }

  return confirmService;
};

const cancelAServiceIntoDB = async (serviceId: string) => {
  const bikeService = await ServiceHistory.findOne({ _id: serviceId });
  if (!bikeService) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found!');
  }

  const confirmService = await ServiceHistory.findByIdAndUpdate(
    serviceId,
    { isConfirmed: false },
    { new: true },
  );

  if (!confirmService) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Service not found and failed to update!',
    );
  }

  return confirmService;
};

const getAllServicesFromDB = async () => {
  const services = await ServiceHistory.find();
  if (!services) {
    throw new AppError(httpStatus.NOT_FOUND, 'Services not found!');
  }

  return services;
};

const getMyServicesFromDB = async (userData: JwtPayload) => {
  //* check if the user exist in database
  const user = await User.isUserExistsByUserEmail(userData.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  const userId = userData._id;

  const service = await ServiceHistory.find({
    $or: [{ serviceReceiver: userId }, { serviceProvider: userId }],
  });
  if (!service) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'No services found for this user!',
    );
  }

  const populatedServices = await ServiceHistory.populate(service, [
    { path: 'bike' },
    { path: 'service' },
    { path: 'serviceProvider' },
    { path: 'serviceReceiver' },
  ]);

  return populatedServices;
};

const getAServiceFromDB = async (id: string) => {
  const service = await ServiceHistory.findById(id);
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found!');
  }

  return service;
};

const paymentAServiceFromDB = async (id: string) => {
  const service = await ServiceHistory.findById(id).populate('service');
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found!');
  }

  const couponId = (service?.service as any)?.coupon;
  let price = (service?.service as any)?.price;
  
  if (couponId) {
    const coupon = await Coupon.findOne({ _id: couponId });
    if (coupon) {
      //* Apply coupon discount to the price
      price -= coupon.discountAmount;
      if (price < 0) {
        price = 0;
      }
    }
  }

  // Optionally, update the service document with the new price
  service.serviceBill = price;
  service.maintenanceRecords += 1;
  service.isPayed = true;
  await service.save();

  return service;
};

const updateAServiceFromDB = async (serviceId: string, payload: any) => {
  const bikeService = await ServiceHistory.findOne({ _id: serviceId });
  if (!bikeService) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found!');
  }

  const updatedService = await ServiceHistory.findByIdAndUpdate(
    serviceId,
    payload,
    {
      new: true,
    },
  );
  if (!updatedService) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Service not found and failed to update!',
    );
  }

  return updatedService;
};

const deleteAServiceFromDB = async (serviceId: string) => {
  const bikeService = await ServiceHistory.findById(serviceId);
  if (!bikeService) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found!');
  }

  const deleteService = await ServiceHistory.findByIdAndDelete(serviceId);
  if (!deleteService) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Service not found and failed to delete!',
    );
  }

  return deleteService;
};

export const ServiceHistoryService = {
  requestAServiceIntoDB,
  confirmAServiceIntoDB,
  cancelAServiceIntoDB,
  getAllServicesFromDB,
  getMyServicesFromDB,
  getAServiceFromDB,
  paymentAServiceFromDB,
  updateAServiceFromDB,
  deleteAServiceFromDB,
};
