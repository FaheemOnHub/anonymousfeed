import mongoose, { Schema, Document, mongo } from "mongoose";

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
  messages: Message[];
}
const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^[a-zA-Z0-9_]{3,20}$/,
      "Username is invalid, only allow letters, numbers and underscore, length from 3 to 20 characters",
    ],
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  verifyCode: {
    type: String,
    required: true,
  },
  verifyCodeExpiry: {
    type: Date,
    required: true,
  },
  isAcceptingMessage: {
    type: Boolean,
    required: true,
  },
  messages: [MessageSchema],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

const MessageModel =
  (mongoose.models.Message as mongoose.Model<Message>) ||
  mongoose.model<Message>("Message", MessageSchema);

export default { UserModel, MessageModel };
