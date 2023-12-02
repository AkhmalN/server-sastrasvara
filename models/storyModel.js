import mongoose from "mongoose";

const Story = mongoose.Schema(
  {
    judul: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    audio: {
      type: String,
    },
    script: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Story", Story);
