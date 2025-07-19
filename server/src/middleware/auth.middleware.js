import jwt from "jsonwebtoken";
import { userModel } from "../model/user.model.js";
import { errorFunction } from "../utils/error.util.js";

export const authorized = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return errorFunction(403, false, "Unauthorized", res);

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) return errorFunction(404, false, "Invalid token", res);

    const user = await userModel.findById(decode.userId).select("-password");
    if (!user) return errorFunction(404, false, "Unknown user", res);

    req.user = user;
    next();
  } catch (error) {
    errorFunction(500, false, "Server error", res);
    console.log(error);
  }
};
