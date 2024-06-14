import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";

import { ApiResponse } from "@/types/apiResponse";

export default async function sendVerificationEmail(
  email: string,
  username: string, // 👈 added username parameter as specified in VerifyEmail template
  verifyCode: string // 👈 added verifyCode parameter as specified in VerifyEmail template
): Promise<ApiResponse> {
  // 👈 Promise<ApiResponse>  return type, we tell the function this should be return type
  try {
    await resend.emails.send({
      to: "email",
      from: "",
      subject: "Verify your email address",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: "Verification email sent." };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      success: false,
      message: "An error occurred while sending the verification email.",
    };
  }
}
