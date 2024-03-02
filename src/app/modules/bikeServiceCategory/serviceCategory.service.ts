/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TBikeServiceCategory } from './serviceCategory.interface';
import { ServiceCategory } from './serviceCategory.model';
import { User } from '../user/user.model';
import { Coupon } from '../coupon/coupon.model';

const createBikeServiceCategoryIntoDB = async (
  payload: TBikeServiceCategory,
) => {
  const { serviceName, serviceProvider } = payload;

  //* Check if the service with the given name already exists
  const existServices = await ServiceCategory.findOne({ serviceName });
  if (existServices) {
    throw new AppError(
      httpStatus.CONFLICT,
      `${serviceName} service is already exists`,
    );
  }

  //* Check if the user is exist in database
  const user = await User.findOne({ _id: serviceProvider });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, `User is not found!`);
  }

  const serviceCategory = await ServiceCategory.create(payload);
  if (!serviceCategory) {
    throw new AppError(httpStatus.CONFLICT, 'Service category not created!');
  }

  return serviceCategory;
};

const getAllBikeServiceCategoriesFromDB = async () => {
  const serviceCategories = await ServiceCategory.find();
  if (!serviceCategories) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service categories not found!');
  }
  return serviceCategories;
};

const getABikeServiceCategoryFromDB = async (id: string) => {
  const serviceCategory = await ServiceCategory.findById(id);
  if (!serviceCategory) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service category not found!');
  }

  return serviceCategory;
};

const updateBikeServiceCategoryFromDB = async (
  categoryId: string,
  payload: any,
) => {
  const serviceCategory = await ServiceCategory.findById(categoryId);
  if (!serviceCategory) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service category not found!');
  }

  const updateService = await ServiceCategory.findByIdAndUpdate(
    categoryId,
    payload,
    { new: true },
  );
  if (!updateService) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Service not found and failed to update!',
    );
  }

  return updateService;
};

const assignCouponToBikeServiceFromDB = async (
  categoryId: string,
  coupon: string,
) => {
  const serviceCategory = await ServiceCategory.findById(categoryId);
  if (!serviceCategory) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service category not found!');
  }

  //* Check if the dose not exist coupon in database
  const existCoupon = await Coupon.findOne({ _id: coupon });
  if (!existCoupon) {
    throw new AppError(httpStatus.NOT_FOUND, `This coupon  is no exist!`);
  }

  //* Check if the already assign coupon is exist in database
  const alreadyAssignCoupon = await ServiceCategory.findOne({
    $and: [{ _id: categoryId }, { coupon }],
  });

  if (alreadyAssignCoupon) {
    throw new AppError(
      httpStatus.CONFLICT,
      `Already assign coupon in this service!`,
    );
  }

  const assignCoupon = await ServiceCategory.findByIdAndUpdate(
    categoryId,
    { coupon },
    { new: true },
  );
  if (!assignCoupon) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Failed to assign coupon to bike service!',
    );
  }

  return assignCoupon;
};

const deleteCouponToBikeServiceFromDB = async (categoryId: string) => {
  const serviceCategory = await ServiceCategory.findById(categoryId);
  if (!serviceCategory) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service category not found!');
  }

  const removeCoupon = await ServiceCategory.findByIdAndUpdate(
    categoryId,
    { $unset: { coupon: '' } },
    { new: true },
  );
  if (!removeCoupon) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Failed to assign coupon to bike service!',
    );
  }

  return removeCoupon;
};

const deleteABikeServiceCategoryFromDB = async (categoryId: string) => {
  const categoryService = await ServiceCategory.findById(categoryId);
  if (!categoryService) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category service not found!');
  }

  const deleteService = await ServiceCategory.findByIdAndDelete(categoryId);
  if (!deleteService) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Service not found and failed to delete!',
    );
  }

  return deleteService;
};

export const ServiceCategoryService = {
  createBikeServiceCategoryIntoDB,
  getAllBikeServiceCategoriesFromDB,
  getABikeServiceCategoryFromDB,
  updateBikeServiceCategoryFromDB,
  assignCouponToBikeServiceFromDB,
  deleteCouponToBikeServiceFromDB,
  deleteABikeServiceCategoryFromDB,
};
