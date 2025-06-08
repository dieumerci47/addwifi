const User = require("../models/User");
const Users = require("../models/Users");

module.exports.getAllUser = async (req, res) => {
  try {
    const { mois, annee } = req.body;
    // console.log(req.body);
    const users = await User.find()
      .where("mois")
      .equals(mois.toLowerCase())
      .where("annee")
      .equals(annee);

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports.getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports.updateUser = async (req, res) => {
  try {
    const { prix } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { prix },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports.addUser = async (req, res) => {
  // const mois = req.body.mois;
  try {
    const newUser = new Users({ ...req.body });
    newUser
      .save()
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
