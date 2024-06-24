import jwt from "jsonwebtoken";
const secretKey = "wLQo0Vo > C2UabFX";
export const shouldBeLoggedIn = async (req, res) => {
  console.log(req.userId);
  //using this id we'll verify our user while deleting/creating post
  res.status(200).json({ msg: "You are authenticated" });
};
export const shouldBeAdmin = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ msg: "Not Authenticated" });
  jwt.verify(token, secretKey, async (err, payload) => {
    if (err) return res.status(403).json({ msg: "Token not valid" });
    if (!payload.isAdmin)
      return res.status(403).json({ msg: "Not  authorized" });
    //logged in and admin then authenticated
    res.status(200).json({ msg: "You are authenticated" });
  });
};
