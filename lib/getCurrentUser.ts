import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

type DecodedToken = {
   userId: string;
};

export const getCurrentUser = async (): Promise<DecodedToken | null> => {
   const token = (await cookies()).get("auth_token")?.value;

   if (!token || !process.env.JWT_SECRET) return null;

   try {
      const decoded = (await jwt.verify(
         token,
         process.env.JWT_SECRET
      )) as DecodedToken;

      return decoded;
   } catch (error) {
      console.error("Invalid token:", error);
      return null;
   }
};
