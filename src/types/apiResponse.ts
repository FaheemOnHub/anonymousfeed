import { Message } from "@/model/User";
export interface ApiResponse {
  data?: any;
  success: boolean;
  message: string;
  isAcceptingMessages?: boolean;
  messages?: Message[];
}

export default ApiResponse;
