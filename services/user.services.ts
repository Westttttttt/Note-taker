import { FormDataTypes } from "@/components/Navbar";
import { IUser } from "@/models/user.model";
import { ApiError, ApiSuccess } from "@/types/api";

export const fetchCurrentUser = async () => {
   const res = await fetch("/api/user/me");
   const data: ApiSuccess<IUser> | ApiError = await res.json();

   if (data.success) {
      return {
         user: data.data,
         success: data.success,
         message: data.message,
      };
   } else {
      return {
         user: null,
         success: data.success,
         error: data.error,
      };
   }
};

export const signup = async (formData: FormDataTypes) => {
   const res = await fetch("/api/user/register", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         username: formData.username,
         password: formData.password,
      }),
   });

   const data: ApiSuccess<IUser> | ApiError = await res.json();

   if (data.success) {
      return {
         user: data.data,
         success: data.success,
         message: data.message,
      };
   } else {
      return {
         user: null,
         success: data.success,
         error: data.error,
      };
   }
};

export const signin = async (formData: FormDataTypes) => {
   const res = await fetch("/api/user/login", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         username: formData.username,
         password: formData.password,
      }),
   });

   const data: ApiSuccess<IUser> | ApiError = await res.json();

   if (data.success) {
      return {
         user: data.data,
         success: data.success,
         message: data.message,
      };
   } else {
      return {
         user: null,
         success: data.success,
         error: data.error,
      };
   }
};
