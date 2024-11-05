// models/Item.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Define the Item schema
const itemSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100, // Maximum length for the title
  },
  description: {
    type: String,
    required: true,
    maxlength: 500, // Maximum length for the description
  },
  category: {
    type: String,
    enum: ['Electronics', 'Books', 'Clothing', 'Accessories', 'Others'], // You can add more categories
    default: 'Others',
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String, // URL of the uploaded image
    required: true, // Set to true if images are mandatory
  },
  dateFound: {
    type: Date,
    required: true,
    default: Date.now, // The date when the item was found or lost
  },
  status: {
    type: String,
    enum: ['Lost', 'Found'],
    required: true,
  },
  approvalStatus: {
    type:Boolean,
    required: true,
    default: false
  },
  approvalBy: {
    type: String,
    default: null
  },
  approvalByName: {
    type: String,
    default: null
  },
  contactInfo: {
    type: String,
    required: true, // Contact information of the user posting the item
  },
  postedBy: {
    type:String,
    required: true,
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Export the Item model
const Item = model('Item', itemSchema);

export default Item;
