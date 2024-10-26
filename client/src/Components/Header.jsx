import React, { useEffect } from "react";
import logo from "../Assets/logo3.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Header() {
  const navigate = useNavigate();
  const [userImage, setUserImage] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState("");
  console.log(`User Image: ${userImage}`);
  console.log("User Logged In:", userLoggedIn);
  useEffect(() => {
    setUserLoggedIn(localStorage.getItem("userExists") || "false");
    setUserImage(JSON.parse(localStorage.getItem("userInfo"))?.picture || "");
  })
  return (
    <div className=" bg-primary fixed poppins top-0 left-0 h-10vh box-border text-primary-light w-full border-b-2 border-primary-light/[0.3] ">
      <div className="w-full h-full flex items-center justify-between pr-5 sm:pr-10">
        <img
          src={logo}
          className="h-10vh w-10vh cursor-pointer "
          alt="logo"
          onClick={() => navigate("/")}
        />
        <div className="flex gap-6 justify-center items-center sm:gap-10">
          <h1
            className="text-lg cursor-pointer text-orange-600 font-medium"
            onClick={() => navigate("/additem")}
          >
            Add Item
          </h1>
        <div>
            {userLoggedIn === "true1" ? (
            <img onClick={() => navigate(`/profile/${JSON.parse(localStorage.getItem("userInfo"))._id}`)} className="h-10 cursor-pointer rounded-full"  src={userImage} alt="profile" />
          ) : (
            <h1
              className="text-lg cursor-pointer text-orange-600 font-medium"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </h1>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
