import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { SetStateAction } from "react";
import { Textarea } from "./ui/textarea";

type UpdateFormType = {
   title: string;
   content: string;
};

type Props = {
   isEditModelOpen: boolean;
   setIsEditModelOpen: React.Dispatch<SetStateAction<boolean>>;
   updateFormData: UpdateFormType;
   setUpdateFormData: React.Dispatch<SetStateAction<UpdateFormType>>;
   handleSubmit: (e:React.FormEvent) => Promise<void>;
};

const EditNoteModel = ({
   isEditModelOpen,
   setIsEditModelOpen,
   updateFormData,
   setUpdateFormData,
   handleSubmit,
}: Props) => {
   const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => {
      setUpdateFormData({
         ...updateFormData,
         [e.target.name]: e.target.value,
      });
   };

   return (
      <Dialog open={isEditModelOpen} onOpenChange={setIsEditModelOpen}>
         <DialogContent className="sm:max-w-[90%] h-[80%]">
            <form
               onSubmit={handleSubmit}
               className="flex flex-col justify-between"
            >
               <DialogHeader>
                  <DialogTitle>Edit Notes</DialogTitle>
                  <DialogDescription>
                     Make changes to your Note here. Click save when you&apos;re
                     done.
                  </DialogDescription>
               </DialogHeader>
               <div className="grid gap-4">
                  <div className="grid gap-3">
                     <Label htmlFor="name-1">Title</Label>
                     <Input
                        name="title"
                        value={updateFormData.title}
                        onChange={handleChange}
                     />
                  </div>
                  <div className="grid gap-3">
                     <Label htmlFor="username-1">Content</Label>
                     <Textarea
                        name="content"
                        value={updateFormData.content}
                        onChange={handleChange}
                        className="h-96"
                     />
                  </div>
               </div>
               <DialogFooter className="mt-6">
                  <DialogClose asChild>
                     <Button variant="neutral">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save changes</Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   );
};

export default EditNoteModel;
