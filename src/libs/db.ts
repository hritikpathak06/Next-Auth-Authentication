import mongoose from "mongoose";



export const connectToDatabase = () => {
  try {
    mongoose.connect(process.env.MONGO_DB_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Database Connected Successfully");
    });
    connection.on("error", (err: any) => {
      console.log(
        "MongoDb error.Please Make Sure Your Database is Connected" + err
      );
    });
  } catch (error) {
    console.log("Something went wrong Please try to connect again", error);
  }
};
