import userModels from "../models/userModels.js";

export const Auth = async (req, res) => {
  try {
    const user = await userModels.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Username atau Password tidak ditemukan!" });
    }
    const userData = {
      username: user.username,
      email: user.email,
      id: user._id,
      kelas: user.kelas,
      kampus: user.asal_kampus,
    };
    return res.status(200).json({ message: "Berhasil Login!", user: userData });
  } catch (error) {
    return res.status(500).json({ message: "Terjadi Kesalahan pada server!" });
  }
};
