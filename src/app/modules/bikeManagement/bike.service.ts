import { JwtPayload } from 'jsonwebtoken';
import { TBike, TSaleBike } from './bike.interface';
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

  bike.seller = userData._id; //* add seller to bike model

  const addBike = await Bike.create(bike);
  return addBike;
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

const createSalesBikeIntoDB = async (
  payload: TSaleBike,
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

  const bike = await Bike.findById(payload.bikeId);
  if (!bike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not found!');
  }

  const newBike = new SaleBike({
    name: bike.name,
    image: bike.image,
    description: bike.description,
    seller: bike.seller,
    bike: bike._id,
    price: bike.price,
    quantity: payload.quantity,
    brand: bike.brand,
    model: bike.model,
    type: bike.type,
    size: bike.size,
    color: bike.color,
    frameMaterial: bike.frameMaterial,
    suspensionType: bike.suspensionType,
    manufacturerCountry: bike.manufacturerCountry,
    isSale: true,
    releaseDate: payload.saleDate,
  });

  //* If input quantity exceeds available stock, throw an error
  if (payload.quantity! > bike.quantity) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Out stock of the product!',
    );
  }

  const result = await newBike.save(); //* save sale bike data in SaleBike 

  //* Update the bike quantity in the database
  const updatedBike = await Bike.findByIdAndUpdate(
    payload.bikeId,
    { $inc: {quantity: -payload.quantity! } },
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
    await Bike.findByIdAndDelete(payload.bikeId);
  }

  return result;
};

const getAllSalesBikeIntoDB = async (query: Record<string, unknown>) => {
  const bikeQuery = new QueryBuilder(SaleBike.find().populate('seller'), query)
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

const getASaleBikeIntoDB = async (id: string, userData: JwtPayload) => {
  const user = await User.isUserExistsByUserEmail(userData.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const result = await SaleBike.findById(id).populate('seller');
  return result;
};

const getSellerAllSaleBikeIntoDB = async (
  query: Record<string, unknown>,
  userData: JwtPayload,
) => {
  const user = await User.isUserExistsByUserEmail(userData.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const userId = user._id;
  const bikeQuery = new QueryBuilder(
    SaleBike.find({ seller: userId }).populate('seller'),
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

const updateASaleBikeIntoDB = async (
  id: string,
  payload: Partial<TBike>,
  userData: JwtPayload,
) => {
  const user = await User.isUserExistsByUserEmail(userData.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const saleBike = await SaleBike.findById(id);
  if (!saleBike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Sale bike not found!');
  }
  

  //* If other user update bike
  if (String(user._id) !== String(saleBike?.seller)) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Only this bike seller update this bike!',
    );
  }

  const originalBike = await Bike.findById(saleBike.bike);
  if (!originalBike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Original bike not found!');
  }

  if (payload && payload.quantity! > 0) {
    originalBike.quantity += Number(saleBike.quantity - payload.quantity!);
  }

  const updatedBike = await originalBike.save();
  if (!updatedBike) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to update original bike quantity');
  }

  const result = await SaleBike.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Sale Bike not updated!');
  }
  return result;
};

const deleteASaleBikeIntoDB = async (id: string, userData: JwtPayload) => {
  const user = await User.isUserExistsByUserEmail(userData.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const saleBike = await SaleBike.findById(id);
  if (!saleBike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Sale bike not found!');
  }

   //* If other user delete bike
   if (String(user._id) !== String(saleBike.seller)) {
    throw new AppError(httpStatus.FORBIDDEN, 'Only the seller can delete this bike');
  }

  const originalBike = await Bike.findById(saleBike.bike);
  if (!originalBike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Original bike not found!');
  }

  //* Increase the quantity of the original bike
  originalBike.quantity += saleBike.quantity;

  const updatedBike = await originalBike.save();
  if (!updatedBike) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to update original bike quantity');
  }

  //* Delete the sale bike
  const result = await SaleBike.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Sale bike not deleted!');
  }
  return result;
};

export const BikeServices = {
  createBikeIntoDB,
  getAllBikeIntoDB,
  getAllSellerBikeIntoDB,
  updateABikeIntoDB,
  deleteABikeIntoDB,
  bulkDeleteBikesIntoDB,

  createSalesBikeIntoDB,
  getAllSalesBikeIntoDB,
  getASaleBikeIntoDB,
  getSellerAllSaleBikeIntoDB,
  updateASaleBikeIntoDB,
  deleteASaleBikeIntoDB
};
