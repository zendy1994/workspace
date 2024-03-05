export interface ITableNames {
  [key: string]: string;
}

export const TableNames: ITableNames = {
  FILE: 'file',
  USER: 'user',
  BLACKLISTED_TOKEN: 'blacklisted_token',
  OTP: 'otp',
  USER_FOLLOW: 'user_follow',
};
