import { JwtPayload } from 'jsonwebtoken';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { TReview } from './review.interface';
import { Review } from './review.model';
import { reviewSearchableFields } from './review.constant';

const createReviewIntoDB = async (
  review: TReview,
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

  const addReview = await Review.create(review);
  return addReview;
};

const getAllReviewIntoDB = async (query: Record<string, unknown>) => {
  const reviewQuery = new QueryBuilder(Review.find(), query)
    .search(reviewSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await reviewQuery.modelQuery;
  const meta = await reviewQuery.countTotal();
  return {
    meta,
    result,
  };
};

  const getAReviewIntoDB = async (id: string, userData: JwtPayload) => {
    const user = await User.isUserExistsByUserEmail(userData.email);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
  
    const result = await Review.findById(id).populate('user product bike');
    return result;
  };
  
  const updateAReviewIntoDB = async (
    id: string,
    payload: Partial<TReview>,
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
  
    const review = await Review.findById(id);
    if (!review) {
      throw new AppError(httpStatus.NOT_FOUND, 'Review is not found!');
    }
  
    const result = await Review.findByIdAndUpdate(id, payload, {
      new: true,
    });
    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, 'Review is not updated!');
    }
    return result;
  };
  
  const deleteAReviewIntoDB = async (id: string, userData: JwtPayload) => {
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
  
    const review = await Review.findById(id);
    if (!review) {
      throw new AppError(httpStatus.NOT_FOUND, 'Review is not found!');
    }
  
    const result = await Review.findByIdAndDelete(id);
    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, 'Review is not deleted!');
    }
    return result;
  };

export const ReviewServices = {
  createReviewIntoDB,
  getAllReviewIntoDB,
  getAReviewIntoDB,
  updateAReviewIntoDB,
  deleteAReviewIntoDB
};
