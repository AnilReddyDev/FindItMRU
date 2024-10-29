import React, {useState,useEffect } from "react";
import ItemPostComp from "../Components/ItemPostComp";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
export default function Listings() {
  const [fetchedListings, setFetchedListings] = useState([]);
  const statuses = ["Lost", "Found"];
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams({
    status: "",
    category: "",
  });
  const categories = [
    "Electronics",
    "Books",
    "Clothing",
    "Accessories",
    "Others",
  ];
  const statusParam = searchParams.get("status");
  const categoryParam = searchParams.get("category");
  const fetchListings = async () => {
    try {
      const response = await axios.get("/api/v1/item");
      setFetchedListings(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterListings = () => {
    if (categoryParam && statusParam) {
      return fetchedListings.filter(
        (listing) =>
          listing.category === categoryParam && listing.status === statusParam
      );
    } else if (categoryParam) {
      return fetchedListings.filter((listing) => listing.category === categoryParam);
    } else if (statusParam) {
      return fetchedListings.filter((listing) => listing.status === statusParam);
    } else {
      return fetchedListings;
    }
  };
  
  useEffect(() => {
    fetchListings();
  }, []);
  useEffect(() => {
    setFilteredItems(filterListings());
  }, [statusParam, categoryParam, fetchedListings]);

  return (
    <div className=" min-h-screen poppins box-border w-full bg-gradient-to-t from-primary/[0.90] to-primary  flex flex-col">
      <div className="w-full h-10vh"></div>
      <div className="w-full h-7vh flex justify-center items-center gap-5 mt-2 sm:mt-0">
        {statuses.map((status) => (
          <button
            key={status}
            className={` font-normal rounded-md px-3 py-2 ${
                statusParam === status ? "bg-[#fc4903]/[0.90] text-white" : "bg-white/[0.8] text-secondary"
              }`}
            onClick={() =>
              setSearchParams((prev) => {
                prev.set("status", status);
                return prev;
              },{replace:true})
            }
          >
            {status === "Lost" ? "Lost Items" : "Found Items"}
          </button>
        ))}
      </div>
      <div className="w-full no-scrollbar h-7vh flex justify-center items-center gap-5 overflow-scroll sm:pl-0 pl-56 pr-7 sm:pr-0">
        {categories.map((category) => (
          <button
            key={category}
            className={`  font-normal rounded-full px-3 py-1 ${
                categoryParam === category ? "bg-[#fc4903]/[0.90] text-white" : "bg-white/[0.8] text-secondary"
              }`}
            onClick={() =>
              setSearchParams((prev) => {
                prev.set("category", category);
                return prev;
              },{replace:true})
            }
          >
            {category}
          </button>
        ))}
      </div>
      <div className="w-full min-h-90vh sm:py-10 pt-6 px-5 flex flex-wrap pb-10 justify-center items-center gap-5 ">

        {filteredItems.length > 0
          ? filteredItems.map((item) => (
              <ItemPostComp key={item._id} data={item} />
            ))
          : "No items found."}
  
      </div>
    </div>
  );
}
