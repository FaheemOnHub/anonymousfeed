import mongoose, { Connection } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

export default async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Using existing connection");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log("Error connecting to database: ", error);
  }
}
