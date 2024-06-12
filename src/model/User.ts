import mongoose, { Schema, Document } from "mongoose";

// Define TypeScript interface for Message document
export interface Message extends Document {
  content: string;
  createdAt: Date;
}

// Define Mongoose schema using the TypeScript interface
const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define TypeScript interface for Message document
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isAcceptingMessage: boolean;
}
