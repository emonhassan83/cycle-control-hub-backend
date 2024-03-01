/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ServiceHistory } from './bikeService.model';
import { TServiceHistory } from './bikeService.interface';
import { Buyer } from '../buyerManagement/buyerManagement.model';
import { ServiceCategory } from '../bikeServiceCategory/serviceCategory.model';

const requestAServiceIntoDB = async (payload: TServiceHistory) => {
  const { bike, service } = payload;

  //* Check if the bike dose not exists
  const purchaseBike = await Buyer.findOne({ bike });
  if (!purchaseBike) {
    throw new AppError(httpStatus.CONFLICT, `You can only request service in purchase bike`);
  }

  //* Check if the bike dose not exists
  const bikeService = await ServiceCategory.findOne({ _id: service });
  if (!bikeService) {
    throw new AppError(httpStatus.CONFLICT, `You can only request service in purchase bike`);
  }

  const result = await ServiceHistory.create(payload);
  if (!result) {
    throw new AppError(httpStatus.CONFLICT, 'Service request is not created!');
  }

  return result;
};

const confirmAServiceIntoDB = async (serviceId: string) => {
  console.log(serviceId);
};

const cancelAServiceIntoDB = async (serviceId: string) => {
  console.log(serviceId);
};

const getAllServicesFromDB = async () => {
  const services = await ServiceHistory.find();
  if (!services) {
    throw new AppError(httpStatus.NOT_FOUND, 'Services not found!');
  }

  return services;
};

const getAServiceFromDB = async (id: string) => {
  const service = await ServiceHistory.findById(id);
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found!');
  }

  return service;
};

const updateAServiceFromDB = async (serviceId: string, payload: any) => {
  const bikeService = await ServiceHistory.findById(serviceId);
  if (!bikeService) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found!');
  }

  const updatedService = await ServiceHistory.findByIdAndUpdate(serviceId, payload, {
    new: true,
  });
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
  getAServiceFromDB,
  updateAServiceFromDB,
  deleteAServiceFromDB,
};
