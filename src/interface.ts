/**
 * @description User-Service parameters
 */
 export interface IUserOptions {
  uid: string;
}

export interface IGetUserResponse {
  success: boolean;
  message: string;
  data: IUserOptions;
}

export interface IPostUserOptions {
  uid: string;
  name: string;
  age: number;
  tel: string;
}

export interface IPostUserResponse {
  success: boolean;
  message: string;
  data: IPostUserOptions;
}
