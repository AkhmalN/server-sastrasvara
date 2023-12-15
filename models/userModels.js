import mongoose, { Schema } from "mongoose";

const User = mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    kelas: {
      type: String,
    },
    asal_kampus: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", User);
