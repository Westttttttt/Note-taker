"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

export default function NotesPage() {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [editNote, setEditNote] = useState({ title: "", content: "" });

   const openEditModal = (title, content) => {
      setEditNote({ title, content });
      setIsModalOpen(true);
   };

   return (
      <div className="min-h-screen bg-background px-4 sm:px-8 lg:px-16 py-10">
         <Toaster/>
         <Navbar />
         {/* Create Note Section */}
         <section className="max-w-3xl mx-auto mb-12">
            <Card className="p-6 bg-white shadow-lg rounded-xl border border-gray-100">
               <Input
                  placeholder="Note title..."
                  className="text-xl font-medium px-4 py-3 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
               />
               <Textarea
                  placeholder="Write your thoughts here..."
                  className="mt-4 min-h-[150px] px-4 py-3 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
               />
               <div className="mt-4 text-right">
                  <Button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200">
                     Save Note
                  </Button>
               </div>
            </Card>
         </section>

         {/* Notes List */}
         <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(4)].map((_, idx) => (
               <Card
                  key={idx}
                  className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
               >
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                     Note Title {idx + 1}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                     Sed non risus. Suspendisse lectus tortor, dignissim sit
                     amet, adipiscing nec, ultricies sed, dolor.
                  </p>
                  <div className="flex gap-2 justify-end">
                     <Button
                        size="sm"
                        className="border-gray-300 text-green-600 hover:bg-green-50 transition-all duration-200"
                        onClick={() =>
                           openEditModal(
                              `Note Title ${idx + 1}`,
                              "Lorem ipsum dolor sit amet..."
                           )
                        }
                     >
                        Edit
                     </Button>
                     <Button
                        size="sm"
                        className="border-gray-300 text-gray-600 hover:bg-gray-50 transition-all duration-200"
                     >
                        Delete
                     </Button>
                  </div>
               </Card>
            ))}
         </section>

         {/* Edit Modal */}
         {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
               <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl transform transition-all duration-300 scale-100">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                     Edit Note
                  </h2>
                  <Input
                     value={editNote.title}
                     onChange={(e) =>
                        setEditNote({ ...editNote, title: e.target.value })
                     }
                     className="text-lg font-medium px-4 py-3 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mb-4"
                  />
                  <Textarea
                     value={editNote.content}
                     onChange={(e) =>
                        setEditNote({ ...editNote, content: e.target.value })
                     }
                     className="min-h-[150px] px-4 py-3 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mb-4"
                  />
                  <div className="flex gap-2 justify-end">
                     <Button
                        className="border-gray-300 text-gray-600 hover:bg-gray-50 transition-all duration-200"
                        onClick={() => {
                           setIsModalOpen(false);
                           setEditNote({ title: "", content: "" });
                        }}
                     >
                        Cancel
                     </Button>
                     <Button
                        className="bg-green-600 hover:bg-green-700 text-white transition-all duration-200"
                        onClick={() => {
                           setIsModalOpen(false);
                           setEditNote({ title: "", content: "" });
                        }}
                     >
                        Save
                     </Button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
