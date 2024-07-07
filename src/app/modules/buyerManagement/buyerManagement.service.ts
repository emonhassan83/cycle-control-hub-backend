import { JwtPayload } from 'jsonwebtoken';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TBuyer } from './buyerManagement.interface';
import { Buyer } from './buyerManagement.model';
import { SaleBike } from '../bikeManagement/bike.model';
import { BikeSearchableFields } from '../bikeManagement/bike.constant';
import QueryBuilder from '../../builder/QueryBuilder';

const purchaseBikeIntoDB = async (buyerData: TBuyer, userData: JwtPayload) => {
  const { bike: bikeId /* other buyer info */ } = buyerData;

  //* Find the bike by its ID
  const bike = await SaleBike.findById(bikeId);
  if (!bike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not found!');
  }

  //* Check if there is enough quantity available
  if (bike.quantity < 1) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Out of stock, This product not available!',
    );
  }

  buyerData.buyer = userData._id; //* add seller to bike model

  //* Create a buyer record
  const result = await Buyer.create(buyerData);

  //* Update the bike quantity in the database
  const updatedBike = await SaleBike.findByIdAndUpdate(
    bikeId,
    { $inc: { quantity: -1 } },
    { new: true },
  );

  if (!updatedBike) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update bike quantity',
    );
  }

  return result;
};

const confirmPurchaseBikeIntoDB = async (
  userData: JwtPayload,
  bikeId: string,
) => {
  const user = await User.isUserExistsByUserEmail(userData.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  //* Update the bike quantity in the database
  const result = await Buyer.findOneAndUpdate(
    { bike: bikeId },
    { isConfirmed: true },
    { new: true },
  );

  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to confirm bike!',
    );
  }

  return result;
};

const viewPurchaseBikeIntoDB = async (
  query: Record<string, unknown>,
  userData: JwtPayload,
) => {
  const user = await User.isUserExistsByUserEmail(userData.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const bikeQuery = new QueryBuilder(
    Buyer.find({ buyer: user._id }).populate('buyer seller bike'),
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

const viewAllPurchaseBikeIntoDB = async (
  query: Record<string, unknown>,
  userData: JwtPayload,
) => {
  const user = await User.isUserExistsByUserEmail(userData.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const bikeQuery = new QueryBuilder(
    Buyer.find().populate('buyer bike seller'),
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

const cancelPurchaseBikeIntoDB = async (
  userData: JwtPayload,
  bikeId: string,
) => {
  const user = await User.isUserExistsByUserEmail(userData.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const buyer = await Buyer.findOne({ buyer: user._id });
  if (!buyer) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'You are not buyer so you can not cancel bike order!',
    );
  }

  //* Find the bike by its ID
  const saleBike = await SaleBike.findById(bikeId);
  if (!saleBike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not found!');
  }

  //* Increment the product quantity in the database
  const updatedBike = await SaleBike.findByIdAndUpdate(
    bikeId,
    { $inc: { quantity: 1 } },
    { new: true },
  );
  if (!updatedBike) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update bike quantity',
    );
  }

  //* Delete the buyer record
  const result = await Buyer.deleteOne({ bike: bikeId });
  if (result.deletedCount === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to found delete bike!');
  }

  return result;
};

const generateDailyReport = async () => {
  try {
    const currentDate = new Date();
    const startOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      0,
      0,
      0,
    );
    const endOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      23,
      59,
      59,
    );

    const dailySales = await Buyer.aggregate([
      {
        $match: {
          buyingDate: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        },
      },
      {
        $lookup: {
          from: 'bikes',
          localField: 'bike',
          foreignField: '_id',
          as: 'bikeDetails',
        },
      },
      {
        $unwind: '$bikeDetails',
      },
      {
        $lookup: {
          from: 'users',
          localField: 'bikeDetails.seller',
          foreignField: '_id',
          as: 'sellerDetails',
        },
      },
      {
        $unwind: '$sellerDetails',
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$bikeDetails.price' },
          count: { $sum: 1 },
          sales: {
            $push: {
              buyerName: '$buyer.buyerName',
              sellerName: '$sellerDetails.username',
              productName: '$bikeDetails.productName',
              price: '$bikeDetails.price',
            },
          },
        },
      },
    ]);

    if (dailySales.length > 0) {
      // Round totalSales to 2 decimal places
      dailySales[0].totalSales = parseFloat(
        dailySales[0].totalSales.toFixed(2),
      );
    }

    return dailySales[0] || { totalSales: 0, count: 0, sales: [] };
  } catch (error) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Internal Server Error',
    );
  }
};

const generateWeeklyReport = async () => {
  try {
    const currentDate = new Date();
    const startOfWeek = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay(),
      0,
      0,
      0,
    );
    const endOfWeek = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay() + 6,
      23,
      59,
      59,
    );

    const weeklySales = await Buyer.aggregate([
      {
        $match: {
          buyingDate: {
            $gte: startOfWeek,
            $lte: endOfWeek,
          },
        },
      },
      {
        $lookup: {
          from: 'bikes',
          localField: 'bike',
          foreignField: '_id',
          as: 'bikeDetails',
        },
      },
      {
        $unwind: '$bikeDetails',
      },
      {
        $lookup: {
          from: 'users',
          localField: 'bikeDetails.seller',
          foreignField: '_id',
          as: 'sellerDetails',
        },
      },
      {
        $unwind: '$sellerDetails',
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$bikeDetails.price' },
          count: { $sum: 1 },
          sales: {
            $push: {
              buyerName: '$buyer.buyerName',
              sellerName: '$sellerDetails.username',
              productName: '$bikeDetails.productName',
              price: '$bikeDetails.price',
            },
          },
        },
      },
    ]);

    if (weeklySales.length > 0) {
      weeklySales[0].totalSales = parseFloat(
        weeklySales[0].totalSales.toFixed(2),
      );
    }

    return weeklySales[0] || { totalSales: 0, count: 0, sales: [] };
  } catch (error) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Internal Server Error',
    );
  }
};

const generateMonthlyReport = async () => {
  try {
    const currentDate = new Date();
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
      0,
      0,
      0,
    );
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
      23,
      59,
      59,
    );

    const monthlySales = await Buyer.aggregate([
      {
        $match: {
          buyingDate: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
        },
      },
      {
        $lookup: {
          from: 'bikes',
          localField: 'bike',
          foreignField: '_id',
          as: 'bikeDetails',
        },
      },
      {
        $unwind: '$bikeDetails',
      },
      {
        $lookup: {
          from: 'users',
          localField: 'bikeDetails.seller',
          foreignField: '_id',
          as: 'sellerDetails',
        },
      },
      {
        $unwind: '$sellerDetails',
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$bikeDetails.price' },
          count: { $sum: 1 },
          sales: {
            $push: {
              buyerName: '$buyer.buyerName',
              sellerName: '$sellerDetails.username',
              productName: '$bikeDetails.productName',
              price: '$bikeDetails.price',
            },
          },
        },
      },
    ]);

    if (monthlySales.length > 0) {
      monthlySales[0].totalSales = parseFloat(
        monthlySales[0].totalSales.toFixed(2),
      );
    }

    return monthlySales[0] || { totalSales: 0, count: 0, sales: [] };
  } catch (error) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Internal Server Error',
    );
  }
};

const generateYearlyReport = async () => {
  try {
    const currentDate = new Date();
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1, 0, 0, 0);
    const endOfYear = new Date(currentDate.getFullYear(), 12, 0, 23, 59, 59);

    const yearlySales = await Buyer.aggregate([
      {
        $match: {
          buyingDate: {
            $gte: startOfYear,
            $lte: endOfYear,
          },
        },
      },
      {
        $lookup: {
          from: 'bikes',
          localField: 'bike',
          foreignField: '_id',
          as: 'bikeDetails',
        },
      },
      {
        $unwind: '$bikeDetails',
      },
      {
        $lookup: {
          from: 'users',
          localField: 'bikeDetails.seller',
          foreignField: '_id',
          as: 'sellerDetails',
        },
      },
      {
        $unwind: '$sellerDetails',
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$bikeDetails.price' },
          count: { $sum: 1 },
          sales: {
            $push: {
              buyerName: '$buyer.buyerName',
              sellerName: '$sellerDetails.username',
              productName: '$bikeDetails.productName',
              price: '$bikeDetails.price',
            },
          },
        },
      },
    ]);

    if (yearlySales.length > 0) {
      yearlySales[0].totalSales = parseFloat(
        yearlySales[0].totalSales.toFixed(2),
      );
    }

    return yearlySales[0] || { totalSales: 0, count: 0, sales: [] };
  } catch (error) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Internal Server Error',
    );
  }
};

export const BuyerServices = {
  purchaseBikeIntoDB,
  viewPurchaseBikeIntoDB,
  viewAllPurchaseBikeIntoDB,
  confirmPurchaseBikeIntoDB,
  cancelPurchaseBikeIntoDB,
  generateDailyReport,
  generateWeeklyReport,
  generateMonthlyReport,
  generateYearlyReport,
};
