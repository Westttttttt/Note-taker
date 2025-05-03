import { errorResponse, successResponse } from "@/lib/customResponse";
import { DecodedToken, getCurrentUser } from "@/lib/getCurrentUser";
import Note, { INote } from "@/models/note.model";

export async function GET() {
   try {
      const currUser: DecodedToken | null = await getCurrentUser();

      if (!currUser) {
         return errorResponse({
            error: "Unauthorized, Please login first",
            status: 401,
         });
      }

      const notes: INote[] | null = await Note.find({
         ownerId: currUser.userId,
      });

      return successResponse({
         message: "Note fetch successfully",
         status: 200,
         data: notes,
      });
   } catch (error) {
      console.log("Error getting Notes", error);
      return errorResponse({
         error: "Internal server error" + error,
         status: 500,
      });
   }
}
