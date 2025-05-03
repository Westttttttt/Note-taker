"use client";

import {
   deleteNote,
   getCurrentUserNote,
   updateNote,
} from "@/services/note.services";
import React, { useContext, useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { NoteContext } from "@/context/NoteContext";
import { toast } from "sonner";
import EditNoteModel from "./EditNoteModel";

type UpdateFormType = {
   title: string;
   content: string;
};

const UserNotes = () => {
   const { notes, setNotes } = useContext(NoteContext)!;
   const [isEditModelOpen, setIsEditModelOpen] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [updateFormData, setUpdateFormData] = useState<UpdateFormType>({
      title: "",
      content: "",
   });
   const [updatedNoteId, setUpdatedNoteId] = useState<string | null>(null);

   useEffect(() => {
      const fetchNote = async () => {
         setIsLoading(true);
         const res = await getCurrentUserNote();
         if (res.success) {
            setIsLoading(false);
            setNotes(res.notes);
         } else {
            setIsLoading(false);
            setNotes([]);
         }
      };

      fetchNote();
   }, [setNotes]);

   const handleDelete = async (noteId: string) => {
      const res = await deleteNote(noteId);
      if (res.success) {
         toast.success(res.message);
         const filteredNotes = notes.filter(
            (note) => String(note._id).toString() !== noteId
         );
         setNotes(filteredNotes);
      } else {
         toast.error(res.error);
      }
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const res = await updateNote({ noteId: updatedNoteId!, updateFormData });
      if (res.success) {
         toast.success(res.message);
         setIsEditModelOpen(false);
         const note = await getCurrentUserNote();
         setNotes(note.notes);
      } else {
         toast.error(res.error);
      }
   };

   return (
      <section className="flex gap-4 w-full justify-center flex-wrap">
         {isLoading && <h1>Loading...</h1>}
         {notes &&
            !isLoading &&
            notes.map((note) => (
               <Card
                  key={note.title}
                  className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 w-98 max-sm:w-full"
               >
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                     {note.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                     {note.content}
                  </p>
                  <div className="flex gap-2 justify-end">
                     <Button
                        className="cursor-pointer"
                        onClick={() => {
                           setIsEditModelOpen(true);
                           setUpdateFormData({
                              title: note.title,
                              content: note.content,
                           });
                           setUpdatedNoteId(note._id as string);
                        }}
                     >
                        Edit
                     </Button>
                     <Button
                        onClick={() => {
                           handleDelete(note._id as string);
                        }}
                        className="cursor-pointer"
                     >
                        Delete
                     </Button>
                  </div>
               </Card>
            ))}
         {notes.length === 0 && (
            <div>
               <h1>Hey u got no Notes, Dare to create Some?</h1>
            </div>
         )}
         <EditNoteModel
            isEditModelOpen={isEditModelOpen}
            setIsEditModelOpen={setIsEditModelOpen}
            updateFormData={updateFormData}
            setUpdateFormData={setUpdateFormData}
            handleSubmit={handleSubmit}
         />
      </section>
   );
};

export default UserNotes;
