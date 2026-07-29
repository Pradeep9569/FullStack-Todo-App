import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import todoRoute from "./routes/Todo.routes.js";
import userRoute from "./routes/user.route.js";


dotenv.config();

const app = express();


const PORT = process.env.PORT || 3001;
const DB_URI = process.env.MONGODB_URI;

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
 origin:process.env.FRONTEND_URI ,
 credentials:true,
 methods:"GET , POST , PUT , DELETE",
 allowedHeaders:["Content-Type", "Authorization"] //Add other headers you want to allow here.

}))



app.get("/", (req, res) => {
  res.json({ message: "Todo API is running" });
});

if (DB_URI) {
  mongoose
    .connect(DB_URI)
    .then(() => console.log("connected to MongoDB"))
    .catch((error) => console.log("MongoDB connection error:", error.message));
} else {
  console.log("MONGODB_URI not set. Skipping database connection.");
}




//routes

app.use("/todo", todoRoute);
app.use("/user" , userRoute);


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});