import dbConnect from "@/lib/dbConnect";
import sendVerificationEmail from "@/helpers/sendVerificationEmail";
import bcrypt from "bcryptjs"; //dont forget to install bcryptjs type , as a dev dependency command: npm install --save-dev @types/bcryptjs

export default async function POST(request: Request) {
  await dbConnect();
  try {
    const { email, username, verifyCode } = await request.json();
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      body: { success: false, message: "An error occurred." },
    };
  }
} //why request: Request? In TypeScript, request: Request is a type annotation that indicates the request parameter is expected to be of type Request. This Request type is typically imported from a library like Express.js, which provides types for handling HTTP requests in a Node.js server.
