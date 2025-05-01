import { authValidator } from "@/lib/authValidator";
import { connectDB } from "@/lib/connectDB";
import { errorResponse, successResponse } from "@/lib/customResponse";
import { generateTokenAndSetCookie } from "@/lib/generateTokenAndSetCookie";
import User, { IUser } from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

type Request = {
   username: string;
   password: string;
};

export async function POST(req: NextRequest): Promise<NextResponse> {
   try {
      const body: Request = await req.json();

      const { username, password } = body;
      if (!username || !password) {
         return errorResponse({
            error: "All fields are required",
            status: 400,
         });
      }

      const isValid = authValidator({ username, password });
      if (!isValid.valid) {
         return errorResponse({
            error: isValid.message,
            status: 400,
         });
      }

      await connectDB();
      const user: IUser | null = await User.findOne({ username });
      if (!user) {
         return errorResponse({
            error: "User not found",
            status: 404,
         });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
         return errorResponse({
            error: "Invalid credentials",
            status: 400,
         });
      }

      await generateTokenAndSetCookie(user._id as string);

      return successResponse({
         message: "Login successful",
         status: 200,
         data: {
            _id: user._id,
            username: user.username,
            profilePic: user.profilePicture,
            notes: user.notes,
         },
      });
   } catch (error) {
      console.log("Login error", error);
      return errorResponse({
         error: "Internal server error" + error,
         status: 500,
      });
   }
}
