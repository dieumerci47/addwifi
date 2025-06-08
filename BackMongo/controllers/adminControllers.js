const Admin = require("../models/Admin");
const User = require("../models/Users");
const ObjectID = require("mongoose").Types.ObjectId;
module.exports.getAllAdmin = async (req, res) => {
  try {
    await Admin.find()
      .then((admin) => {
        res.status(200).json(admin);
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getOneAdmin = async (req, res) => {
  try {
    if (!ObjectID.isValid(req.params.id)) {
      return res.status(400).json({ message: "Unknow " + req.params.id });
    }
    const admin = await Admin.findOne({ _id: req.params.id })
      .select("-password")
      .then((admin) => {
        res.status(200).json(admin);
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports.getPayment = async (req, res) => {
  const { userId, mois, annee, prix } = req.body;
  try {
    await User.findByIdAndUpdate(userId, {
      $push: {
        paiements: {
          mois: mois,
          annee: annee,
          prix: prix,
        },
      },
    })
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
