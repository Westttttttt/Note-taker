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
import { FormDataTypes } from "./Navbar";
import { signin, signup } from "@/services/user.services";
import { toast } from "sonner";

type Props = {
   isDialogOpen: boolean;
   setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>;
   authType: "Sign up" | "Sign in";
   formData: FormDataTypes;
   setFormData: React.Dispatch<SetStateAction<FormDataTypes>>;
};

export default function AuthDialog({
   isDialogOpen,
   setIsDialogOpen,
   authType,
   formData,
   setFormData,
}: Props) {
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      toast.success("Helllo")
      // if (authType === "Sign up") {
      //    const res = await signup(formData);
      //    if (res.success) {
      //       toast.success(res.message);
      //    } else {
      //       toast.error(res.error);
      //    }
      // } else {
      //    const res = await signin(formData);
      //    if (res.success) {
      //       toast.success(res.message);
      //    } else {
      //       toast.error(res.error);
      //    }
      // }

      // setFormData({
      //    username: "",
      //    password: "",
      // });
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
