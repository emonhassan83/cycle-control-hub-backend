/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Coupon } from './coupon.model';
import { TCoupon } from './coupon.interface';

const createCouponIntoDB = async (payload: TCoupon) => {
  const result = await Coupon.create(payload);
  if (!result) {
    throw new AppError(httpStatus.CONFLICT, "Coupon not created!");
  }

  return result;
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
