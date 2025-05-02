"use client";

export type FormDataTypes = {
   username: string;
   password: string;
};

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { IUser } from "@/models/user.model";
import { fetchCurrentUser, logout } from "@/services/user.services";
import AuthDialog from "./AuthDialog";
import { toast } from "sonner";

const Navbar = () => {
   const [user, setUser] = useState<IUser | null>(null);
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [authType, setAuthType] = useState<"Sign in" | "Sign up">("Sign in");
   const [formData, setFormData] = useState<FormDataTypes>({
      username: "",
      password: "",
   });

   console.log(user);

   async function handleLogout() {
      const res = await logout();
      if (res.success) {
         toast.success(res.message);
         setUser(null);
      } else {
         toast.error(res.error);
      }
   }

   useEffect(() => {
      const fetchUser = async () => {
         const res = await fetchCurrentUser();
         if (res.success) {
            setUser(res.user);
         } else {
            setUser(null);
         }
      };

      fetchUser();
   }, [isDialogOpen]);

   return (
      <header className="flex justify-between items-center bg-white shadow-sm rounded-lg px-6 py-4 mb-12">
         <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            My Notes
         </h1>
         {user && (
            <div className="flex gap-3 items-center">
               <section>
                  <img
                     src={user.profilePicture}
                     className="w-14 h-14 rounded-full border border-gray-400 object-cover"
                  />
               </section>
               <Button
                  className="bg-gray-500 text-white hover:bg-gray-600 transition-all duration-200 hover:cursor-pointer"
                  onClick={handleLogout}
               >
                  Logout
               </Button>
            </div>
         )}
         {!user && (
            <div className="flex gap-4">
               <Button
                  className="cursor-pointer"
                  onClick={() => {
                     setIsDialogOpen(true);
                     setAuthType("Sign up");
                  }}
               >
                  Sign up
               </Button>
               <Button
                  className="cursor-pointer"
                  onClick={() => {
                     setIsDialogOpen(true);
                     setAuthType("Sign in");
                  }}
               >
                  Sign in
               </Button>
               <AuthDialog
                  isDialogOpen={isDialogOpen}
                  setIsDialogOpen={setIsDialogOpen}
                  authType={authType}
                  formData={formData}
                  setFormData={setFormData}
                  setUser={setUser}
               />
            </div>
         )}
      </header>
   );
};

export default Navbar;
