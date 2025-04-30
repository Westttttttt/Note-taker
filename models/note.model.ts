import mongoose, { Schema, Types } from "mongoose";
import { IUser } from "./user.model";

export interface INote extends Document {
   ownerId: Types.ObjectId | IUser;
   title: string;
   content: string;
}

const noteSchema = new Schema<INote>({
   ownerId: {
      type: Types.ObjectId,
      ref : "User",
      required: true,
   },
   title: {
      type: String,
      requied: true,
   },
   content: {
      type: String,
   },
});

const Note = mongoose.models.Note || mongoose.model("Note", noteSchema);

export default Note;
