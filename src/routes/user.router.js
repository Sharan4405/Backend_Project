import { Router } from "express";
import { registerUser } from "../controllers/user.controller";

const UserRouter = Router();
// You can require and use your routes here ;)
UserRouter.route("/register").post(registerUser)
UserRouter.route("/login").post(registerUser)

export default UserRouter