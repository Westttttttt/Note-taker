import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
import Notes from "@/components/UserNotes";
import CreateNote from "@/components/CreateNote";

export default function NotesPage() {
   return (
      <div className="w-full min-h-screen bg-background px-4 sm:px-8 lg:px-16 py-10 ">
         <Toaster />
         <Navbar />
         {/* Create Note Section */}
         <section className="max-w-3xl mx-auto mb-12">
            <CreateNote />
         </section>

         <div className="w-full ">
            <Notes />
         </div>
      </div>
   );
}
