"use client";

import { INote } from "@/models/note.model";
import React, {
   createContext,
   useState,
   ReactNode,
   SetStateAction,
} from "react";

type NoteContextType = {
   notes: INote[];
   setNotes: React.Dispatch<SetStateAction<INote[]>>;
};

export const NoteContext = createContext<NoteContextType | undefined>(
   undefined
);

export const NoteProvider = ({ children }: { children: ReactNode }) => {
   const [notes, setNotes] = useState<INote[]>([]);

   return (
      <NoteContext.Provider value={{ notes, setNotes }}>
         {children}
      </NoteContext.Provider>
   );
};
