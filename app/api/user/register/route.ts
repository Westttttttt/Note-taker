import { authValidator } from "@/lib/authValidator";
import { connectDB } from "@/lib/connectDB";
import { errorResponse, successResponse } from "@/lib/createResponse";
import User, { IUser } from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

type ResposeBody = {
   username: string;
   password: string;
};

export async function POST(req: NextRequest): Promise<NextResponse> {
   try {
      const body: ResposeBody = await req.json();
      const { username, password } = body;
      if (!username || !password) {
         return errorResponse({
            error: "All fields are required",
            status: 400,
         });
      }

      const isValid = authValidator({ username, password });
      if (!isValid.valid) {
         return errorResponse({ error: isValid.message, status: 400 });
      }

      const isAlreadyExists = await User.findOne({ username });
      if (isAlreadyExists) {
         return errorResponse({
            error: "User already exists",
            status: 400,
         });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const profilePicture = `https://robohash.org/${username}`;

      await connectDB();

      const newUser = new User({
         username,
         password: hashedPassword,
         profilePicture,
      });

      const createdUser: IUser = await newUser.save();
      if (!createdUser) {
         return errorResponse({
            error: "Failed to saved user",
            status: 400,
         });
      }

      return successResponse({
         message: "User created successfully",
         status: 201,
         data: {
            _id: createdUser._id,
            username: createdUser.username,
            profilePicture: createdUser.profilePicture,
            notes: createdUser.notes,
         },
      });
   } catch (error) {
      console.log("Error registering user", error);
      return errorResponse({
         error: "Internal server error" + error,
         status: 500,
      });
   }
}
