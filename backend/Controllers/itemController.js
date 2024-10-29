import asyncHandler from "express-async-handler";
import Item from "../Models/ItemModel.js";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../Utils/cloudinary.js";

// add new item
const addItem = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    category,
    location,
    status,
    contactInfo,
  } = req.body;
  const { token } = req.cookies;
  let postedBy = "uploaded by mawa bro";
  console.log("Token :", token);

  // Verify JWT token synchronously with try-catch
   if (token){
    jwt.verify(token, process.env.SECRET_KEY,{},async (err,userData)=>{
      if (err) throw new Error("Not authorized, please login");
      postedBy = userData.id;
      console.log("token decoded data :", userData);
    })
  } else {
    res.status(401);
    throw new Error("Not authorized, please login");
  }

  const imageLocalPath = req.files?.itemImage[0]?.path;
  if (!imageLocalPath) {
    res.status(400);
    throw new Error("Please upload an image");
  }

  const image = await uploadOnCloudinary(imageLocalPath);

  const item = await Item.create({
    title,
    description,
    category,
    location,
    status,
    contactInfo,
    postedBy,
    image: image.url,
  });
  res.send("Item added successfully");
});

// get all items
const getItems = asyncHandler(async (req, res) => {
  const allItems = await Item.find({});
  res.status(200).json(allItems);
});

//update an item
const updateItem = asyncHandler(async (req, res) => {
  res.send("update an item");
  console.log("update an item");
});

//delete an item
const deleteItem = asyncHandler(async (req, res) => {
   const itemId = req.params.itemid;
   const userId = req.params.userid;
  //  console.log(`Item ID: ${itemId}`);
  //  console.log(`User ID: ${userId}`);
  const deletedItem = await Item.find({_id:itemId,postedBy:userId}).deleteOne();
  if (!deletedItem) {
    res.status(404);
    throw new Error("Item not found");
  }
  res.status(200).json({ message: "Item deleted successfully" });
});
export { addItem, deleteItem, getItems, updateItem };
