import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Failed to get users!" });
  }
};

export const getUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Failed to get user!" });
  }
};

export const updateUser = async (req, res) => {
  //take id from cookie of logged in user
  //compare with id coming in req if equal then only the user can update
  const id = req.params.id;
  //to verify the you are the owner
  const tokenUserId = req.userId; //->we passed this userId in verifytoken
  const { password, avatar, ...rest } = req.body;

  if (id !== tokenUserId) {
    // console.log(id, " ", tokenUserId);
    return res.status(403).json({ msg: " Not Authorized!" });
  }

  let updatedPassword = null;
  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...rest,
        //if there's an updatedpass i.e. pass was changed then update else password will be same
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });
    const { password: userPassword, ...others } = updatedUser;
    res.status(200).json(others); //don't send password
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Failed to update user!" });
  }
};
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  if (id !== tokenUserId)
    return res.status(403).json({ msg: " Not Authorized!" });
  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ msg: "User deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Failed to delete user!" });
  }
};
