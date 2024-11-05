import asyncHandler from "express-async-handler";
import Item from "../Models/ItemModel.js";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../Utils/cloudinary.js";
import User from "../Models/userModel.js";
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
  // console.log("Token :", token);

  // Verify JWT token synchronously with try-catch
   if (token){
    jwt.verify(token, process.env.SECRET_KEY,{},async (err,userData)=>{
      if (err) throw new Error("Not authorized, please login");
      postedBy = userData.id;
      // console.log("token decoded data :", userData);
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
  const allItems = await Item.find({approvalStatus:true})
  res.status(200).json(allItems);
});


//get items for admin approval
const getItemsForAdmin = asyncHandler(async (req, res) => {
  const allItems = await Item.find({})
  res.status(200).json(allItems);
});

//get logged in user items
const getMyItems = asyncHandler(async (req, res) => {
  const { token } = req.cookies;
  let postedUserId = "uploaded by mawa bro";
  // Verify JWT token synchronously with try-catch
  if (token){
     jwt.verify(token, process.env.SECRET_KEY,{},async (err,userData)=>{
      if (err) throw new Error("Not authorized, please login");
      postedUserId = userData.id;
      // console.log("token decoded data :", userData);
    })
  } else {
    res.status(401);
    throw new Error("Not authorized, please login");
  }
  const myItems = await Item.find({postedBy:postedUserId})
  res.status(200).json(myItems);
});

//update an item
const updateItem = asyncHandler(async (req, res) => {
  res.send("update an item");
  // console.log("update an item");
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

//approve an item
const onApproval = asyncHandler(async (req, res) => {
  const itemId = req.params.itemid;
  const { token } = req.cookies;
  let isAdmin = false;
  let updatedBy = "uploaded by mawa bro";
  let username = "mawa bro";
  // Verify JWT token synchronously with try-catch
  if (token){
     jwt.verify(token, process.env.SECRET_KEY,{},async (err,userData)=>{
      if (err) throw new Error("Not authorized, please login");
      isAdmin = userData.isAdmin;
      updatedBy = userData.id;
      username = userData.username;
      // console.log("token decoded data :", userData);
    })
  } else {
    res.status(401);
    throw new Error("Not authorized, please login");
  }
//// If the user is not an admin, throw an error. This is to prevent normal users from approving items. Only admins should be able to approve items.
  if (isAdmin === false) {
    // console.log(`User is not an admin`);
    res.status(401);
    throw new Error("Unauthorized");
  }
  if (updatedBy === "uploaded by mawa bro") {
    // console.log(`User is not an admin`);
    res.status(401);
    throw new Error("Unauthorized");
  }
  
  const approvedItem = await Item.findOneAndUpdate({_id:itemId},{approvalStatus:true,approvalBy:updatedBy,approvalByName:username});

  if (!approvedItem) {
    res.status(404);
    throw new Error("Item not found");
  }
  res.send("update an item successfull");
  // console.log("update an item successfull");
});

const deleteItemByAdmin = asyncHandler(async (req, res) => {
  const itemId = req.params.itemid;
  const { token } = req.cookies;
  let userId = "uploaded by mawa bro";

  // Verify JWT token synchronously with try-catch
  if (token){
     jwt.verify(token, process.env.SECRET_KEY,{},async (err,userData)=>{
      if (err) throw new Error("Not authorized, please login");
      userId = userData.id;
      // console.log("token decoded data :", userData);
    })
  } else {
    res.status(401);
    throw new Error("Not authorized, please login");
  }

  // console.log(`Item ID: ${itemId} User ID: ${userId}`);
  const userFound = await User.findById(userId);
  if (!userFound) {
    // console.log(`User not found`);
    res.status(404);
    throw new Error("User not found");
  }
  // console.log(`User Found: ${userFound}`);

  if (userFound.isAdmin === false) {
    // console.log(`User is not an admin`);
    res.status(401);
    throw new Error("Unauthorized");
  }


  const deletedItem = await Item.findByIdAndDelete(itemId);

  if (!deletedItem) {
    res.status(404);
    throw new Error("Item not found");
  }

  res.status(200).json({ message: "Item deleted successfully" });
  // console.log(`Item deleted successfully`);
});

export { addItem, deleteItem, getItems, updateItem, deleteItemByAdmin,getMyItems,getItemsForAdmin,onApproval };
