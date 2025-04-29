import { NextResponse } from "next/server";

//this is the type of the response
type SuccessResponseType<T = undefined> = {
   success: boolean;
   message: string;
   data?: T;
};

//this is the props that we will pass after some code execute successfully
type SuccessProps<T = undefined> = {
   message: string;
   status: number;
   data?: T;
};

type ErrorResponseType = {
   success: boolean;
   error: string;
};

type ErrorProps = {
   error: string;
   status: number;
};

export const successResponse = <T>({
   message,
   status,
   data,
}: SuccessProps<T>): NextResponse<SuccessResponseType<T>> => {
   return NextResponse.json(
      { success: true, message, ...(data ? { data } : {}) },
      { status }
   );
};


export const errorResponse = ({
   error,
   status,
}: ErrorProps): NextResponse<ErrorResponseType> => {
   return NextResponse.json(
      {
         success: false,
         error,
      },
      { status }
   );
};
