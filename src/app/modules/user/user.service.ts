import config from "../../config";
import { createToken } from "../Auth/auth.utils";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const registerUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  
    //create token and sent to the  client
    const jwtPayload = {
      _id: result._id,
      email: result.email,
      role: result.role,
    };
  
    const userData = {
      ...jwtPayload,
      username: result.username,
    };
  
    const token = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string
    );
  
    return {
      user: userData,
      token,
    };
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const getAUserFromDB = async (id: string) => {
  const result = await User.findById( id );
  return result;
};

export const UserService = {
  registerUserIntoDB,
  getAllUsersFromDB,
  getAUserFromDB,
};
