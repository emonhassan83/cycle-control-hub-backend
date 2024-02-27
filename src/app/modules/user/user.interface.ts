import { Types } from "mongoose";
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
    _id: Types.ObjectId;
    username: string;
    email: string;
    password: string;
    role: 'admin'| 'buyer'| 'seller';
    createdAt?: string;
    updatedAt?: string;
}

export interface UserModel extends Model<TUser> {
    isUserExistsByUserEmail(username: string): Promise<TUser>;
    isUserExistsByEmail(email: string): Promise<TUser>;
    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string,
      ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;