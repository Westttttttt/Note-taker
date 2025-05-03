import { INote } from "@/models/note.model";
import { ApiError, ApiSuccess } from "@/types/api";

export const getCurrentUserNote = async () => {
   const res = await fetch("/api/note/get_all");
   const data: ApiSuccess<INote[]> | ApiError = await res.json();

   if (data.success) {
      return {
         notes: data.data,
         success: data.success,
         message: data.message,
      };
   } else {
      return {
         notes: [],
         success: data.success,
         error: data.error,
      };
   }
};

export const addNewNote = async ({
   formData,
}: {
   formData: { title: string; content: string };
}) => {
   const res = await fetch("/api/note/create", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
   });

   const data: ApiSuccess<INote> | ApiError = await res.json();

   if (data.success) {
      return {
         note: data.data,
         success: data.success,
         message: data.message,
      };
   } else {
      return {
         note: null,
         success: data.success,
         error: data.error,
      };
   }
};
