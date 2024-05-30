import mongoose from "mongoose";

const Story = mongoose.Schema(
  {
    judul: {
      type: String,
    },
    image: {
      type: String,
    },
    audio: {
      type: String,
    },
    script: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Story", Story);
