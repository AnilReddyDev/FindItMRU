import React from "react";
import homeImg from "../Assets/lost and found logo-02.png";
import { useNavigate } from "react-router-dom";



export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="h-100vh  box-border w-full poppins bg-gradient-to-t   from-primary/[0.90] to-primary   text-primary-light flex flex-col justify-start pt-20 sm:pt-40 items-center">
      <div className="w-full h-10vh"></div>
      <div className="flex flex-col w-full items-center">
        {/* sm:px-20 sm:py-20 px-4 py-0 mt-14 */}
        <img src={homeImg} className="w-9/12 sm:w-5/12 mb-10 sm:mb-16" alt="lost and found" />
        <div className="w-10/12 sm:text-center sm:w-auto">
          <h2 className=" text-base sm:text-lg font-normal tracking-wider pt-1 sm:pt-5  sm:block ">
            MRU Finder is your go-to platform for lost and found items within
            MRU.
          </h2>
          <h2 className="text-base sm:text-lg tracking-wider font-normal   sm:block ">
            Easily <span className="font-bold">report lost items</span> or{" "}
            <span className="font-bold">browse found items</span> posted by
            fellow students and staff.
          </h2>
        </div>
      </div>
      <div className="w-8/12 sm:w-auto mt-16 sm:mt-24">
        <button onClick={() => navigate("/listings?status=Found")} className="bg-primary-light w-full sm:w-56 text-secondary py-3 px-4  font-normal text-lg rounded-md">
          view all Listings
        </button>
      </div>
    </div>
  );
}
