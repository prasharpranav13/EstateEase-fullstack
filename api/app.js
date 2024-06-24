import express from "express";
import postRoute from "../api/routes/post.route.js";
import authRoute from "../api/routes/auth.route.js";
import testRoute from "../api/routes/test.route.js";
import userRoute from "../api/routes/user.route.js";

import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.listen(8000, () => {
  console.log(`Server started at port 8000`);
});
