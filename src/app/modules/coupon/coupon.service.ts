/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Coupon } from './coupon.model';
import { TCoupon } from './coupon.interface';
import { Bike } from '../bikeManagement/bike.model';

const createCouponIntoDB = async (payload: TCoupon) => {
  const {name, applicableBikeIds} = payload;

  //* Check if the coupon with the given name already exists
  const existCoupon = await Coupon.findOne({name});
  if (existCoupon) {
    throw new AppError(httpStatus.CONFLICT, `${name} is already exists`);
  }

   //* Check if any of the applicable bike IDs already have a coupon assigned
  const bikesWithCoupons = await Coupon.find({ applicableBikeIds: { $in: applicableBikeIds }});
  
  if (bikesWithCoupons.length > 0) {
    throw new AppError(httpStatus.CONFLICT, "You have already those bike assigned coupon!");
  }

  //* Check if the bikes with the given IDs exist
  const bikesWithIds = await Bike.find({ _id: { $in: applicableBikeIds } });
  if (bikesWithIds.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "No bike found!");
  }

  const coupon = await Coupon.create(payload);
  if (!coupon) {
    throw new AppError(httpStatus.CONFLICT, "Coupon not created!");
  }

  return coupon;
};

const getAllCouponFromDB = async () => {
  const coupon = await Coupon.find();
  if (!coupon) {
    throw new AppError(httpStatus.NOT_FOUND, "Coupons not found!");
  }
  return coupon;
};

const getACouponFromDB = async (id: string) => {
  const coupon = await Coupon.findById(id);
  if (!coupon) {
    throw new AppError(httpStatus.NOT_FOUND, "Coupon not found!");
  }

  return coupon;
};

const updateCouponFromDB = async (couponId: string, payload: any) => {
  const coupon = await Coupon.findById(couponId);
  if (!coupon) {
    throw new AppError(httpStatus.NOT_FOUND, "Coupon not found!");
  }

  const updatedCoupon = await Coupon.findByIdAndUpdate(couponId, payload, { new: true });
  if (!updatedCoupon) {
    throw new AppError(httpStatus.NOT_FOUND, "Coupon not found and failed to update!");
  }

  return updatedCoupon;
};

const deleteACouponFromDB = async (couponId: string) => {
  const user = await Coupon.findById(couponId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "Coupon not found!");
  }

  const deleteCoupon = await Coupon.findByIdAndDelete(couponId);
  if (!deleteCoupon) {
    throw new AppError(httpStatus.NOT_FOUND, "Coupon not found and failed to delete!");
  }

  return deleteCoupon;
};

export const CouponService = {
  createCouponIntoDB,
  getAllCouponFromDB,
  getACouponFromDB,
  updateCouponFromDB,
  deleteACouponFromDB,
};
