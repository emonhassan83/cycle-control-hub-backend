import { JwtPayload } from 'jsonwebtoken';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { BikeProduct } from './bikeProduct.model';
import { TBikeProduct } from './bikeProduct.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { ProductSearchableFields } from './bikeProduct.constant';

const createProductIntoDB = async (
  product: TBikeProduct,
  userData: JwtPayload,
) => {
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

  const addProduct = await BikeProduct.create(product);
  return addProduct;
};

const getAllBikeProductIntoDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(BikeProduct.find(), query)
    .search(ProductSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();
  return {
    meta,
    result,
  };
};

const getAllSellerProductIntoDB = async (
  query: Record<string, unknown>,
  userData: JwtPayload,
) => {
  const user = await User.isUserExistsByUserEmail(userData.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const userId = user._id;
  const productQuery = new QueryBuilder(
    BikeProduct.find({ seller: userId }).populate('seller'),
    query,
  )
    .search(ProductSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getAProductIntoDB = async (id: string, userData: JwtPayload) => {
  const user = await User.isUserExistsByUserEmail(userData.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const result = await BikeProduct.findById(id).populate('seller');
  return result;
};

const updateAProductIntoDB = async (
  id: string,
  payload: Partial<TBikeProduct>,
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

  const product = await BikeProduct.findById(id);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product is not found!');
  }

  const result = await BikeProduct.findByIdAndUpdate(id, payload, {
    new: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product is not updated!');
  }
  return result;
};

const deleteAProductIntoDB = async (id: string, userData: JwtPayload) => {
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

  const product = await BikeProduct.findById(id);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product is not found!');
  }

  //* If other user delete bike
  // if (String(user._id) !== String(bike?.seller!._id)) {
  //   throw new AppError(
  //     httpStatus.NOT_FOUND,
  //     'Only this biker seller delete this bike',
  //   );
  // }

  const result = await BikeProduct.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike product not deleted!');
  }
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllBikeProductIntoDB,
  getAllSellerProductIntoDB,
  getAProductIntoDB,
  updateAProductIntoDB,
  deleteAProductIntoDB,
};
