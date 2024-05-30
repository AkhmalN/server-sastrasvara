import storyModel from "../models/storyModel.js";

export const createStory = async (req, res) => {
  try {
    const newStory = new storyModel({
      judul: req.body.judul,
      script: req.body.script,
    });
    await newStory.save();
    if (!newStory) {
      return res
        .status(404)
        .json({ message: "Terjadi Kesalahan dalam menambah cerita!" });
    }
    res.status(200).json({ message: "Cerita Ditambahkan" });
  } catch (error) {
    return res.status(404).json({ message: "Terjadi kesalahan pada server!" });
  }
};

export const getStories = async (req, res) => {
  try {
    const story = await storyModel.find();
    if (!story) {
      return res
        .status(404)
        .json({ message: "Tidak ada cerita yang ditemukan" });
    }
    res.status(200).json(story);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getStory = async (req, res) => {
  try {
    const story = await storyModel.findOne({ _id: req.params.id });
    return res.status(200).json(story);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateStory = async (req, res) => {
  try {
    const { judul, script } = req.body;
    const story = await storyModel.findOneAndUpdate(
      { _id: req.params.id },
      { judul, script },
      { new: true }
    );
    if (!story) {
      return res.status(404).json("Terjadi kesalahan!");
    }
    return res.status(200).json(story);
  } catch (error) {
    return res.status(500).json({ message: "Terjadi Kesalahan pada Server!" });
  }
};

export const deleteStory = async (req, res) => {
  try {
    const story = await storyModel.findOneAndDelete({ _id: req.params.id });
    if (!story) {
      return res.status(404).json({ message: "Terjadi Kesalahan!" });
    }
    return res.status(200).json({ message: "Story dihapus" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
