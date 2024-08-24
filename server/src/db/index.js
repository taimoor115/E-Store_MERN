import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDatabase = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );

    console.log(
      `\n Mongo Connected!! Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Mongo Error", error);
    process.exit(1);
  }
};

export default connectDatabase;
