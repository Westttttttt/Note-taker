export const authValidator = ({
   username,
   password,
}: {
   username: string;
   password: string;
}): { valid: boolean; message: string } => {
   if (username.length < 3 || username.length > 16) {
      return {
         valid: false,
         message: "Username should be 3 to 16 char long",
      };
   }

   if (password.length < 4) {
      return {
         valid: false,
         message: "Password should be atleast 4 char long"
      };
   }

   return {
      valid: true,
      message: "Auth Success"
   };
};
