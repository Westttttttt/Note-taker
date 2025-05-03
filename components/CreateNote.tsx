"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React, { useContext, useState } from "react";
import { addNewNote } from "@/services/note.services";
import { NoteContext } from "@/context/NoteContext";
import { toast } from "sonner";

type NoteType = {
   title: string;
   content: string;
};

const CreateNote = () => {
   const { setNotes } = useContext(NoteContext)!;
   const [formData, setFormData] = useState<NoteType>({
      title: "",
      content: "",
   });

   const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = async () => {
      const res = await addNewNote({ formData });
      if (res.success) {
         toast.success(res.message);
         setFormData({
            title: "",
            content: "",
         });
         setNotes((prevNotes) => [...prevNotes, res.note]);
      } else {
         toast.error(res.error);
      }
   };

   return (
      <Card className="p-6 bg-white shadow-lg rounded-xl border border-gray-100">
         <Input
            placeholder="Note title..."
            className="text-xl font-medium px-4 py-3 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            name="title"
            value={formData.title}
            onChange={(e) => handleChange(e)}
         />
         <Textarea
            placeholder="Write your thoughts here..."
            className="mt-4 min-h-[150px] px-4 py-3 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            name="content"
            value={formData.content}
            onChange={(e) => handleChange(e)}
         />
         <div className="mt-4 text-right">
            <Button
               className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200"
               onClick={handleSubmit}
            >
               Save Note
            </Button>
         </div>
      </Card>
   );
};

export default CreateNote;
