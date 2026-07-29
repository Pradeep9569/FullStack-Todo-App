import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },

  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User", // reference User model to connect to collect to users in MongoDb.

    required: true,
  }
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;