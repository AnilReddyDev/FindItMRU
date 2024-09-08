import { Router } from "express";
import { getUser, loginUser } from "../Controllers/userController.js";
import { verifyToken } from "../Utils/verifyGoogleAuthToken.js";
const router = Router();

router.route("/").get(getUser);

//this route is for google auth login
router.route("/auth").post(verifyToken, loginUser);

export default router;
