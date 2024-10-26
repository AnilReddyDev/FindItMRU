import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
export default function FormPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Accessories");
  const [location, setLocation] = useState("");
  const [itemImage, setItemImage] = useState(null);
  const [status, setStatus] = useState("Found");
  const [contactInfo, setContactInfo] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData object
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("location", location);
    formData.append("status", status);
    formData.append("contactInfo", contactInfo);

    // Append the image file if it exists
    if (itemImage) {
      formData.append("itemImage", itemImage);
    }
    console.log("Form Data :",formData);
    try {
      // Send form data with multipart/form-data encoding
      const response = await axios.post(
        "http://localhost:3000/api/v1/item/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);
      // Reset form fields
      setTitle("");
      setDescription("");
      setCategory("Accessories");
      setLocation("");
      setItemImage(null);
      setStatus("Found");
      setContactInfo("");
      navigate("/"); // Use navigate instead of Navigate for navigation
    } catch (error) {
      console.log("Form submission failed! Please Try again!", error);
    }
  };

  useEffect(() => {
  const userExists = localStorage.getItem("userExists")
  console.log("userExists :",userExists);
  if (userExists != "true1") {
    navigate("/signin");
  }
}, [navigate]);

  return (
    <div className="flex flex-col items-center min-h-screen poppins box-border w-full bg-gradient-to-t from-primary/[0.90] to-primary text-primary-light">
      <div className="w-full h-10vh"></div>
      <form
        onSubmit={handleSubmit}
        className="h-auto items-start flex flex-col justify-center"
        encType="multipart/form-data"
      >
        <h1 className="text-2xl font-medium my-5">Add Item</h1>

        <div className="my-2 flex flex-col">
          <label className="text-lg font-normal" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-secondary outline-none h-10 border-2 border-primary-light/[0.3] rounded-md p-2 mt-2"
            placeholder="Enter Title"
            type="text"
          />
        </div>

        <div className="my-2 flex flex-col">
          <label className="text-lg font-normal" htmlFor="description">
            Description
          </label>
          <input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-secondary outline-none h-10 border-2 border-primary-light/[0.3] rounded-md p-2 mt-2"
            placeholder="Enter Description"
            type="text"
          />
        </div>

        <div className="my-2 flex flex-col">
          <label className="text-lg font-normal" htmlFor="category">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            id="category"
            className="text-secondary outline-none h-10 border-2 border-primary-light/[0.3] rounded-md p-2 mt-2"
          >
            <option value="Accessories">Accessories</option>
            <option value="Clothing">Clothing</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="my-2 flex flex-col">
          <label htmlFor="location" className="text-lg font-normal">
            Location
          </label>
          <input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="text-secondary outline-none h-10 border-2 border-primary-light/[0.3] rounded-md p-2 mt-2"
            placeholder="Enter Location"
            type="text"
          />
        </div>

        <div className="my-2 flex flex-col">
          <label className="text-lg font-normal" htmlFor="itemImage">
            Image
          </label>
          <input
            id="itemImage"
            type="file"
            name="itemImage"
            onChange={(e) => setItemImage(e.target.files[0])}
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-orange-600 hover:file:bg-pink-100"
          />
        </div>

        <div className="my-2 flex flex-col">
          <label className="text-lg font-normal" htmlFor="status">
            Status
          </label>
          <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            id="status"
            className="text-secondary outline-none h-10 border-2 border-primary-light/[0.3] rounded-md p-2 mt-2"
          >
            <option value="Found">Found</option>
            <option value="Lost">Lost</option>
          </select>
        </div>

        <div className="my-2 flex flex-col">
          <label className="text-lg font-normal" htmlFor="contactInfo">
            Contact Info
          </label>
          <input
            id="contactInfo"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            className="text-secondary outline-none h-10 border-2 border-primary-light/[0.3] rounded-md p-2 mt-2"
            placeholder="Enter Contact Info"
            type="text"
          />
        </div>

        <input
          type="submit"
          className="bg-orange-600 hover:bg-orange-700 my-5 text-primary py-2 px-5 font-normal text-lg rounded-md"
          value="Submit"
        />
      </form>
    </div>
  );
}
