import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Mongoose is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "share_prompt",
    });
    isConnected = true;
    console.log("Mongoose is connected");
  } catch (error) {
    console.log(error, "the mongooes error");
  }
};
