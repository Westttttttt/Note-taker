import { errorResponse, successResponse } from "@/lib/createResponse";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(): Promise<NextResponse> {
   try {
      (await cookies()).delete("auth_token");

      return successResponse({
         message: "User logout successfully",
         status: 200,
      });
   } catch (error) {
      console.log("Error Loging out", error);
      return errorResponse({
         error: "Internal server error" + error,
         status: 500,
      });
   }
}
