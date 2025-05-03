"use client";

import { INote } from "@/models/note.model";
import { getCurrentUserNote } from "@/services/note.services";
import React, { SetStateAction, useContext, useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { NoteContext } from "@/context/NoteContext";

// type NoteStateTypes = {
//    notes: INote[];
//    setNotes: React.Dispatch<SetStateAction<INote[] | []>>;
// };

const UserNotes = () => {
   // const [notes, setNotes] = useState<INote[] | null>(null);
   const { notes, setNotes } = useContext(NoteContext)!;

   const [isLoading, setIsLoading] = useState(false);

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

   // console.log("Notes====>", notes);

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
                     <Button>Edit</Button>
                     <Button>Delete</Button>
                  </div>
               </Card>
            ))}
         {notes.length === 0 && (
            <div>
               <h1>Hey u got no Notes, Dare to create Some?</h1>
            </div>
         )}
      </section>
   );
};

export default UserNotes;
