import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const UserRouter = Router();
// You can require and use your routes here ;)
UserRouter.route("/register").post(registerUser)

export default UserRouter