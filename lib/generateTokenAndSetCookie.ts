import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = async (userId: string) => {
   if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
   }

   const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
      expiresIn: "12h",
   });

   (await cookies()).set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 12 * 60 * 60, // 12 hours
      path: "/",
   });
};
