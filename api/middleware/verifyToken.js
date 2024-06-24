import jwt from "jsonwebtoken";
const secretKey = "wLQo0Vo > C2UabFX";

export const verifyToken = (req, res, next) => {
  console.log("this is verifytoken middleware");
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ msg: "Not Authenticated(verifytoken)" });
  jwt.verify(token, secretKey, async (err, payload) => {
    if (err) return res.status(403).json({ msg: "Token not valid" });
    // res.status(200).json({ msg: "You are authenticated" });
    req.userId = payload.id;
    next();
  });
};
