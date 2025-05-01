import { connectDB } from "@/lib/connectDB";
import { errorResponse, successResponse } from "@/lib/createResponse";
import { getCurrentUser } from "@/lib/getCurrentUser";
import Note, { INote } from "@/models/note.model";
import User, { IUser } from "@/models/user.model";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

type NoteBodyTypes = {
   title: string;
   content: string;
};

type DecodedToken = {
   userId: string;
   iat: number;
   exp: number;
};

export async function POST(req: NextRequest): Promise<NextResponse> {
   try {
      const currUser: DecodedToken | null = await getCurrentUser();
      console.log(currUser?.userId);
      if (!currUser) {
         return errorResponse({
            error: "Please login first",
            status: 401,
         });
      }

      await connectDB();
      const user: IUser | null = await User.findById(currUser.userId);
      if (!user) {
         return errorResponse({
            error: "Unauthorized, User not found",
            status: 404,
         });
      }

      const body: NoteBodyTypes = await req.json();
      const { title, content } = body;

      if (!title || !content) {
         return errorResponse({
            error: "All fields are required",
            status: 400,
         });
      }

      const newNote = new Note({
         ownerId: user._id as Types.ObjectId,
         title,
         content,
      });

      const savedNote: INote = await newNote.save();

      await User.findByIdAndUpdate(
         user._id,
         { $push: { notes: savedNote._id } },
         { new: true }
      );

      return successResponse({
         message: "Note created Successfully",
         status: 201,
         data: savedNote,
      });
   } catch (error) {
      console.log("Error creating note", error);
      return errorResponse({
         error: "Internal server error" + error,
         status: 500,
      });
   }
}
