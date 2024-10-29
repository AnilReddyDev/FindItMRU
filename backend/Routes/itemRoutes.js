import {Router } from "express";
import {upload} from "../MiddleWare/multer.js";
import { addItem, deleteItem, getItems, updateItem } from "../Controllers/itemController.js";
const router = Router();

router.route("/add").post(upload.fields([{ name: 'itemImage', maxCount: 1 }]),addItem);
router.route("/").get(getItems);
router.route("/update").put(updateItem);
router.route("/delete/:itemid/:userid").delete(deleteItem);

export default router;