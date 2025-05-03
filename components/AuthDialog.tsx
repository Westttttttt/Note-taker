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
import React, { SetStateAction, useContext } from "react";
import { FormDataTypes } from "./Navbar";
import { signin, signup } from "@/services/user.services";
import { toast } from "sonner";
import { IUser } from "@/models/user.model";
import { getCurrentUserNote } from "@/services/note.services";
import { NoteContext } from "@/context/NoteContext";

type Props = {
   isDialogOpen: boolean;
   setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>;
   authType: "Sign up" | "Sign in";
   formData: FormDataTypes;
   setFormData: React.Dispatch<SetStateAction<FormDataTypes>>;
   setUser: React.Dispatch<SetStateAction<IUser | null>>;
};

export default function AuthDialog({
   isDialogOpen,
   setIsDialogOpen,
   authType,
   formData,
   setFormData,
   setUser,
}: Props) {
   const { setNotes } = useContext(NoteContext)!;

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (authType === "Sign up") {
         const res = await signup(formData);
         if (res.success) {
            setIsDialogOpen(false);
            setFormData({
               username: "",
               password: "",
            });

            toast.success(res.message);
         } else {
            toast.error(res.error);
         }
      } else {
         const res = await signin(formData);
         if (res.success) {
            setIsDialogOpen(false);
            setUser(res.user);
            toast.success(res.message);
            setFormData({
               username: "",
               password: "",
            });
            const notes = getCurrentUserNote();
            if ((await notes).success) {
               setNotes((await notes).notes);
            } else {
               setNotes([]);
            }
         } else {
            toast.error(res.error);
         }
      }
   };

   return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
         <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={(e: React.FormEvent) => handleSubmit(e)}>
               <DialogHeader>
                  <DialogTitle>{authType}</DialogTitle>
                  <DialogDescription>
                     {authType} to save the note u have written, and for more
                     good user experience
                  </DialogDescription>
               </DialogHeader>
               <div className="grid gap-4">
                  <div className="grid gap-3">
                     <Label htmlFor="name-1">Username</Label>
                     <Input
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                     />
                  </div>
                  <div className="grid gap-3">
                     <Label htmlFor="username-1">Password</Label>
                     <Input
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                     />
                  </div>
               </div>
               <DialogFooter className="mt-5">
                  <DialogClose asChild>
                     <Button variant="neutral" className="cursor-pointer">
                        Cancel
                     </Button>
                  </DialogClose>
                  <Button type="submit" className="cursor-pointer">
                     {authType}
                  </Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   );
}
