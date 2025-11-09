import userModel from "./user.model.js";

async function getAllUsers(req, res) {
  const queryParams = req.query || {};
  const filter = {};

  if ("ageFrom" in queryParams) {
    filter.age = {
      ...filter.age,
      $gte: Number(queryParams.ageFrom),
    };
  }

  if ("ageTo" in queryParams) {
    filter.age = {
      ...filter.age,
      $lte: Number(queryParams.ageTo),
    };
  }

  const users = await userModel.find(filter).populate("blogs", "title content");
  res.json(users);
}

async function getUserById(req, res) {
  const id = req.params.id;
  const user = await userModel.findById(id);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  res.json(user);
}

async function deleteUserById(req, res) {
  const id = req.params.id;
  const deletedUser = await userModel.findByIdAndDelete(id);
  if (!deletedUser) {
    return res.status(404).json({ message: "user not found" });
  }
  res.json(deletedUser);
}

export const UserService = {
  getAllUsers,
  getUserById,
  deleteUserById,
};
