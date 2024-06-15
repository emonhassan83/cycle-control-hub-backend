import { Types } from "mongoose";
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    contactNumber: string;
    address: string;
    photoUrl?: string;
    needsPasswordChange: boolean;
    passwordChangedAt?: Date;
    role: 'admin'| 'buyer'| 'seller';
    status: 'active' | 'blocked';
    isDeleted: boolean;
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