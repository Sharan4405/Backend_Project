import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
const UserRouter = Router();

// You can require and use your routes here ;)
UserRouter.route("/register").post(
    (req, res, next) => { console.log("Route hit"); next(); },
    upload.fields([
    {
        name:"avatar",
        maxCount: 1
    },
    {
        name:"coverImage",
        maxCount: 1
    }
    ]),
    (err, req, res, next) => {
        if (err) {
            console.log("Multer error:", err);
            return res.status(400).send("Multer error: " + err.message);
        }
        next();
    },
    registerUser)
console.log("Successfully called registerUser from usercontroller")
export default UserRouter