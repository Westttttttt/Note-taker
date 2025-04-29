import mongoose, { Document, Schema, Types } from "mongoose";
import { INote } from "./note.model";

export interface IUser extends Document {
   username: string;
   password: string;
   profilePicture: string;
   notes: Types.ObjectId | INote[];
}

const userSchema = new Schema<IUser>({
   username: {
      type: String,
      required: true,
      minlength: [3, "Username should be atleast 3 char long"],
      maxlength: [16, "Username cannot exceed 16 character"],
      unique: true,
   },
   password: {
      type: String,
      required: true,
   },
   profilePicture: {
      type: String,
   },
   notes: [
      {
         type: Types.ObjectId,
      },
   ],
});

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
