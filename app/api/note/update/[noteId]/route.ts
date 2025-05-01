import { connectDB } from "@/lib/connectDB";
import { errorResponse, successResponse } from "@/lib/customResponse";
import { getCurrentUser } from "@/lib/getCurrentUser";
import Note, { INote } from "@/models/note.model";
import User, { IUser } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
   request: NextRequest,
   { params }: { params: Promise<{ noteId: string }> }
): Promise<NextResponse> {
   try {
      const currUser = await getCurrentUser();
      if (!currUser) {
         return errorResponse({
            error: "Unauthorized",
            status: 401,
         });
      }

      const body = await request.json();
      const { title, content } = body;
      if (!title && !content) {
         //if both of this condition is true we will execute this if case
         return errorResponse({
            error: "Atleast one field should be change to get updated",
            status: 400,
         });
      }

      const noteId = (await params).noteId;
      await connectDB();
      const user: IUser | null = await User.findById(currUser.userId);
      const note: INote | null = await Note.findById(noteId);

      if (!user || !note) {
         return errorResponse({
            error: "User or note not found",
            status: 404,
         });
      }

      //convert Obj to string as user._id and note._id is obj, remember {} === {} is false :)
      const isAuthorized =
         String(user._id).toString() === String(note.ownerId).toString();
      if (!isAuthorized) {
         return errorResponse({
            error: "Unauthorized ,You can't update others people note",
            status: 401,
         });
      }

      const updatedNote = await Note.findByIdAndUpdate(
         note._id,
         {
            title: title || note.title,
            content: content || note.content,
         },
         { new: true }
      );

      if (!updatedNote) {
         return errorResponse({
            error: "Failed to update the note",
            status: 400,
         });
      }

      return successResponse({
         message: "Note updated Successfully",
         status: 200,
         data: updatedNote,
      });
   } catch (error) {
      console.log("Error updating noteId", error);
      return errorResponse({
         error: "Internal server error" + error,
         status: 500,
      });
   }
}
