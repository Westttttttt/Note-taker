import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

type DecodedToken = {
   userId: string;
   iat: number;
   exp: number;
};

export const getCurrentUser = async (): Promise<DecodedToken | null> => {
   const token = (await cookies()).get("auth_token")?.value;

   if (!token || !process.env.JWT_SECRET) return null;

   try {
      const decoded = (await jwt.verify(
         token,
         process.env.JWT_SECRET
      )) as DecodedToken;
      //When we decode this it will return a obj containing the the types of DecodedToken which i declare above , the userId is the payload which we used when creating jwt token , and the other 2 extra fields is the default one

      return decoded;
   } catch (error) {
      console.error("Invalid token:", error);
      return null;
   }
};
