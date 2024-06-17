import { JwtPayload } from 'jsonwebtoken';
import { TBike } from './bike.interface';
import { Bike, SaleBike } from './bike.model';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { BikeSearchableFields } from './bike.constant';
import mongoose from 'mongoose';

const createBikeIntoDB = async (bike: TBike, userData: JwtPayload) => {
  //* checking if the user is exist
  const user = await User.isUserExistsByUserEmail(userData?.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  //* checking if the user is already deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  //* checking if the user is blocked
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  const addBike = await SaleBike.create(bike);
  return addBike;
};

const createSalesBikeIntoDB = async (
  id: string,
  payload: Partial<TBike>,
  userData: JwtPayload,
) => {
  const user = await User.isUserExistsByUserEmail(userData.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  //* checking if the user is already deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  //* checking if the user is blocked
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  const bike = await SaleBike.findById(id);
  if (!bike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not found!');
  }

  const {
    name,
    image,
    description,
    price,
    brand,
    model,
    type,
    size,
    color,
    frameMaterial,
    suspensionType,
    manufacturerCountry,
    quantity,
  } = bike;

  const newBike = new Bike({
    name,
    image,
    description,
    price,
    quantity: payload.quantity,
    releaseDate: payload.releaseDate,
    brand,
    model,
    type,
    size,
    color,
    frameMaterial,
    suspensionType,
    manufacturerCountry,
    isSale: true,
    seller: payload.seller,
  });

  //* If input quantity exceeds available stock, throw an error
  if (payload.quantity! > quantity) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Input quantity cannot exceed the current available stock of the product!',
    );
  }

  const result = await newBike.save();
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not updated!');
  }

  //* Update the bike quantity in the database
  const updatedBike = await SaleBike.findByIdAndUpdate(
    id,
    { $inc: { productQuantity: -payload.quantity! } },
    { new: true },
  );

  if (!updatedBike) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update bike quantity',
    );
  }

  //* If product quantity is 0, remove the product from SaleBike collection
  if (updatedBike.quantity === 0) {
    await SaleBike.findByIdAndDelete(id);
  }

  return result;
};

const getAllSalesBikeIntoDB = async (query: Record<string, unknown>) => {
  const bikeQuery = new QueryBuilder(SaleBike.find(), query)
    .search(BikeSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await bikeQuery.modelQuery;
  const meta = await bikeQuery.countTotal();
  return {
    meta,
    result,
  };
};

const getAllBikeIntoDB = async (query: Record<string, unknown>) => {
  const bikeQuery = new QueryBuilder(Bike.find().populate('seller'), query)
    .search(BikeSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await bikeQuery.modelQuery;
  const meta = await bikeQuery.countTotal();
  return {
    meta,
    result,
  };
};

const getAllSellerBikeIntoDB = async (
  query: Record<string, unknown>,
  userData: JwtPayload,
) => {
  const user = await User.isUserExistsByUserEmail(userData.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const userId = user._id;
  const bikeQuery = new QueryBuilder(
    Bike.find({ seller: userId }).populate('seller'),
    query,
  )
    .search(BikeSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await bikeQuery.modelQuery;
  const meta = await bikeQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getABikeIntoDB = async (id: string, userData: JwtPayload) => {
  const user = await User.isUserExistsByUserEmail(userData.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const result = await Bike.findById(id).populate('seller');
  return result;
};

const updateABikeIntoDB = async (
  id: string,
  payload: Partial<TBike>,
  userData: JwtPayload,
) => {
  const user = await User.isUserExistsByUserEmail(userData.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const bike = await Bike.findById(id);
  if (!bike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not found!');
  }

  //* If other user update bike
  if (String(user._id) !== String(bike?.seller!._id)) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Only this biker seller update this bike',
    );
  }

  const result = await Bike.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not updated!');
  }
  return result;
};

const deleteABikeIntoDB = async (id: string, userData: JwtPayload) => {
  const user = await User.isUserExistsByUserEmail(userData.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const bike = await Bike.findById(id);
  if (!bike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not found!');
  }

  //* If other user delete bike
  if (String(user._id) !== String(bike?.seller!._id)) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Only this biker seller delete this bike',
    );
  }

  const result = await Bike.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not deleted!');
  }
  return result;
};

const bulkDeleteBikesIntoDB = async (
  ids: { ids: Array<string> } | { ids: string },
  userData: JwtPayload,
) => {
  const user = await User.isUserExistsByUserEmail(userData.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const idArray = Array.isArray(ids.ids) ? ids.ids : [ids.ids];
  const objectIds = idArray.map((id) => {
    try {
      return new mongoose.Types.ObjectId(id);
    } catch (error) {
      throw new AppError(httpStatus.BAD_REQUEST, `Invalid ObjectId: ${id}`);
    }
  });

  const bikesWithIds = await Bike.find({ _id: { $in: objectIds } });
  if (bikesWithIds.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'No bike found');
  }

  //* Delete multiple documents from the Bike collection
  const result = await Bike.deleteMany({ _id: { $in: objectIds } });
  return result;
};

export const BikeServices = {
  createBikeIntoDB,
  createSalesBikeIntoDB,
  getAllSalesBikeIntoDB,
  getAllBikeIntoDB,
  getAllSellerBikeIntoDB,
  getABikeIntoDB,
  updateABikeIntoDB,
  deleteABikeIntoDB,
  bulkDeleteBikesIntoDB,
};
