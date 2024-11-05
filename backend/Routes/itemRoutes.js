import { Router } from "express";
import { upload } from "../MiddleWare/multer.js";
import {
  addItem,
  deleteItem,
  getItems,
  updateItem,
  deleteItemByAdmin,
  getMyItems,
  getItemsForAdmin,
  onApproval,
} from "../Controllers/itemController.js";
const router = Router();

router
  .route("/add")
  .post(upload.fields([{ name: "itemImage", maxCount: 1 }]), addItem);
router.route("/").get(getItems);
router.route("/myitems").get(getMyItems);
router.route("/adminitems").get(getItemsForAdmin);
router.route("/update").put(updateItem);
router.route("/approve/:itemid").put(onApproval);
router.route("/delete/:itemid/:userid").delete(deleteItem);
router.route("/admin/delete/:itemid/:userid").delete(deleteItemByAdmin);

export default router;
