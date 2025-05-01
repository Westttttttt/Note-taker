import { connectDB } from "@/lib/connectDB";
import { errorResponse, successResponse } from "@/lib/createResponse";
import { getCurrentUser } from "@/lib/getCurrentUser";
import Note, { INote } from "@/models/note.model";
import { isValidObjectId, Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
   _: NextRequest,
   { params }: { params: Promise<{ noteId: Types.ObjectId }> }
): Promise<NextResponse> {
   try {
      const currUser = await getCurrentUser();
      if (!currUser) {
         return errorResponse({
            error: "Unauthorized, please login first",
            status: 401,
         });
      }

      const noteId = (await params).noteId;

      if (!isValidObjectId(noteId)) {
         return errorResponse({
            error: "Invalid noteId",
            status: 400,
         });
      }

      await connectDB();
      const note: INote | null = await Note.findById(noteId);
      if (!note) {
         return errorResponse({
            error: "Note not found",
            status: 404,
         });
      }

      return successResponse({
         message: "Note fetch successfully",
         status: 200,
         data: note,
      });
   } catch (error) {
      console.log("Error getting note with Id", error);
      return errorResponse({
         error: "Internal server error" + error,
         status: 500,
      });
   }
}
