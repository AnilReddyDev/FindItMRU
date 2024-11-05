import { Router } from "express";
import { getUser, loginUser, logoutUser } from "../Controllers/userController.js";
import { verifyToken } from "../Utils/verifyGoogleAuthToken.js";
const router = Router();

router.route("/").get(getUser);

//this route is for google auth login
router.route("/auth").post(verifyToken, loginUser);
router.route("/auth/logout").delete(logoutUser);

export default router;
