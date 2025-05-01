import { getCurrentUser } from "@/lib/getCurrentUser";
import User from "@/models/user.model";
import { connectDB } from "@/lib/connectDB";
import { successResponse, errorResponse } from "@/lib/createResponse";

export async function POST() {
   try {
      const decoded: { userId: string } | null = await getCurrentUser();
      if (!decoded) {
         return errorResponse({
            error: "Unauthorized",
            status: 401,
         });
      }

      await connectDB();
      const user = await User.findById(decoded.userId).select("-password").populate({
         path: "notes",
         select: "_id title"
      });

      if (!user) {
         return errorResponse({
            error: "User not found",
            status: 404,
         });
      }

      return successResponse({
         message: "User fetched successfully",
         status: 200,
         data: user,
      });
   } catch (error) {
      console.log("Error getting current auth user", error);
      return errorResponse({
         error: "Internal server error" + error,
         status: 500,
      });
   }
}
