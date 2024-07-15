export type TCoupon = {
  name: string;
  expiry: Date;
  discount: number;
  discountType: 'percentage' | 'fixed';
  discountAmount: number;
  applicableBikeIds: Array<string>;
  isDeleted: boolean;
};
