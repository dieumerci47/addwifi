const Admin = require("../models/Admin");
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
        console.log("admin : " + admin);

        res.status(200).json(admin);
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
