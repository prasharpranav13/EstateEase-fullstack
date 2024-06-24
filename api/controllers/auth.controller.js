import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
const secretKey = "wLQo0Vo > C2UabFX";
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    //hash the password->npm i bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    //create a new user and save to db
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    // console.log(newUser);
    res.status(201).json({ msg: "user registered" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to create user" });
  }
};
export const login = async (req, res) => {
  //db operations
  const { username, password } = req.body;
  console.log(req.body);
  //check if user exist
  //check if pass correct
  //generate cookie token & send to user
  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });
    if (!user) res.status(401).json({ msg: "Invalid Credentials!" });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) res.status(401).json({ msg: "Invalid Credentials!" });
    const age = 1000 * 60 * 60 * 24 * 7; //1 week
    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: true,
      },
      secretKey
      // { expiresIn: age }
    );
    const { password: userPassword, ...userInfo } = user;
    res
      .cookie("token", token, {
        // httpOnly: true,
        //secure:true
        // maxAge: age,
      })
      .status(201)
      .json(userInfo);
  } catch (err) {
    res.status(500).json({ msg: "Failed to login!" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ msg: "Log out successfull!" });
};
