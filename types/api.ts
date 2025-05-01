export type ApiSuccess<T> = {
   success: true;
   message: string;
   status: number;
   data: T;
};

export type ApiError = {
   success: false;
   error: string;
   status: number;
};

export type ApiResponse<T = undefined> = ApiSuccess<T> | ApiError;
