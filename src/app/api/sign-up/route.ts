import dbConnect from "@/lib/dbConnect";
import sendVerificationEmail from "@/helpers/sendVerificationEmail";
import bcrypt from "bcryptjs"; //dont forget to install bcryptjs type , as a dev dependency command: npm install --save-dev @types/bcryptjs
import { UserModel } from "@/model/User";
import { use } from "react";
export default async function POST(request: Request) {
  await dbConnect();
  try {
    const { email, username, verifyCode } = await request.json();
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: false,
    });
    if (existingUserVerifiedByUsername) {
      return Response.json({
        status: 400,
        body: { success: false, message: "Username is already taken." },
      });
    }
    const existingUserByEmail = await UserModel.findOne({ email });
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json({
          status: 500,
          message: "User is already verified,no need to send verfication email",
        });
      } else {
        const hashedPassword = await bcrypt.hash(verifyCode, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = otp;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await existingUserByEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(verifyCode, 10);
      const expiriyDate = new Date();
      expiriyDate.setHours(expiriyDate.getHours() + 1);

      const newUser = await UserModel.create({
        email,
        username,
        password: hashedPassword,
        verifyCode: otp,
        verifyCodeExpiry: expiriyDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });
      await newUser.save();
    }
    //send verification email
    const emailResponse = await sendVerificationEmail(email, username, otp);

    if (!emailResponse.success) {
      return Response.json({
        status: 500,
        message: emailResponse.message && "Failed to send email",
      });
    }
    return Response.json({
      success: true,
      message: "User registered successfully, Please verify your email",
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      body: { success: false, message: "An error occurred." },
    };
  }
} //why request: Request? In TypeScript, request: Request is a type annotation that indicates the request parameter is expected to be of type Request. This Request type is typically imported from a library like Express.js, which provides types for handling HTTP requests in a Node.js server.
