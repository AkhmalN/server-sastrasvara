import storyModel from "../models/storyModel.js";
import authorize from "../googleAuth.js";
import uploadFile from "../googleDrive.js";

export const createStory = async (req, res) => {
  try {
    const { judul, script } = req.body;
    const files = req.files;
    const imageFile = files.image ? files.image[0] : null;
    const audioFile = files.audio ? files.audio[0] : null;

    // Folder Google Drive untuk menyimpan image
    const imageFolderId = process.env.GOOGLEDRIVE_IMAGE_ID;
    const audioFolderId = process.env.GOOGLEDRIVE_AUDIO_ID;

    // Mengautentikasi dan mendapatkan klien JWT
    const authClient = await authorize();

    let imageViewLink = null;
    let audioViewLink = null;

    if (imageFile) {
      imageViewLink = await uploadFile(authClient, imageFile, imageFolderId);
    }
    if (audioFile) {
      audioViewLink = await uploadFile(authClient, audioFile, audioFolderId);
    }

    const newStory = new storyModel({
      judul,
      script,
      image: imageViewLink,
      audio: audioViewLink,
    });
    await newStory.save();
    if (!newStory) {
      return res
        .status(404)
        .json({ message: "Terjadi Kesalahan dalam menambah cerita!" });
    }
    res.status(200).json({ message: "Berhasil menambahkan cerita" });
  } catch (error) {
    console.log(error);
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
