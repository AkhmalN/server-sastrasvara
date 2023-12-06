import User from "../models/userModels.js";

export const createUser = async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    await newUser.save();
    if (!newUser) {
      return res.status(404).json({ message: "Terjadi Kesalahan!" });
    }
    return res.status(200).json({ message: "User Ditambahkan" });
  } catch (error) {
    return res.status(404).json({ message: "Terjadi kesalahan pada server!" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const user = await User.find();
    return res.status(200).json({ message: "Hello", user: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Terjadi Kesalahan pada Server!" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { username, email, password },
      { new: true }
    );
    if (!user) {
      return res.status(404).json("Terjadi kesalahan!");
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Terjadi Kesalahan pada Server!" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    if (!user) {
      return res.status(404).json({ message: "terjadi kesalahan!" });
    }
    return res
      .status(200)
      .json({ message: `user ${user.username} telah dihapus!` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
