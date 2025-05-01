import { connectDB } from "@/lib/connectDB";
import { errorResponse, successResponse } from "@/lib/customResponse";
import { getCurrentUser } from "@/lib/getCurrentUser";
import Note, { INote } from "@/models/note.model";
import User, { IUser } from "@/models/user.model";
import { isValidObjectId, Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
   _: NextRequest,
   { params }: { params: Promise<{ noteId: Types.ObjectId }> }
): Promise<NextResponse> {
   try {
      const currUser = await getCurrentUser();
      if (!currUser?.userId) {
         return errorResponse({
            error: "Unauthorized",
            status: 401,
         });
      }

      await connectDB();
      const user: IUser | null = await User.findById(currUser.userId);
      if (!user) {
         return errorResponse({
            error: "Unauthorized, user not found",
            status: 404,
         });
      }

      const noteId: Types.ObjectId = (await params).noteId;
      if (!isValidObjectId(noteId)) {
         return errorResponse({
            error: "Invalid noteId",
            status: 400,
         });
      }

      const note: INote | null = await Note.findById(noteId);
      if (!note) {
         return errorResponse({
            error: "Couldn't find note",
            status: 404,
         });
      }

      //{} === {} false remember, so we have to convert this to string so that it does the work that we desire
      const isAuthorized =
         String(user._id).toString() === note.ownerId.toString();

      if (!isAuthorized) {
         return errorResponse({
            error: "U can only deleted your own note",
            status: 401,
         });
      }

      const deletedNote: INote | null = await Note.findByIdAndDelete(noteId);
      if (deletedNote) {
         await User.findByIdAndUpdate(
            deletedNote.ownerId,
            {
               $pull: { notes: deletedNote._id },
            },
            { new: true }
         );
      }

      return successResponse({
         message: "Note deleted Successfully",
         status: 200,
         data: deletedNote,
      });
   } catch (error) {
      console.log("Error deleting note", error);
      return errorResponse({
         error: "Internal server error" + error,
         status: 500,
      });
   }
}
