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

export const deleteNote = async (noteId: string) => {
   const res = await fetch(`/api/note/delete/${noteId}`, {
      method: "DELETE",
   });

   const data: ApiSuccess<INote> | ApiError = await res.json();

   if (data.success) {
      return {
         deletedNote: data.data,
         success: data.success,
         message: data.message,
      };
   } else {
      return {
         deleteNote: null,
         success: data.success,
         error: data.error,
      };
   }
};

type UpdateFormType = {
   title: string;
   content: string;
};

type UpdateProps = {
   noteId: string;
   updateFormData: UpdateFormType;
};

export const updateNote = async ({ noteId, updateFormData }: UpdateProps) => {
   const res = await fetch(`/api/note/update/${noteId}`, {
      method: "PATCH",
      headers: {
         "Context-Type": "application/json",
      },
      body: JSON.stringify(updateFormData),
   });

   const data: ApiSuccess<INote> | ApiError = await res.json();
   if (data.success) {
      return {
         deletedNote: data.data,
         success: data.success,
         message: data.message,
      };
   } else {
      return {
         deleteNote: null,
         success: data.success,
         error: data.error,
      };
   }
};
