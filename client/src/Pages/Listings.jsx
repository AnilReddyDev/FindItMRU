import React, {useState,useEffect } from "react";
import ItemPostComp from "../Components/ItemPostComp";
import { useSearchParams } from "react-router-dom";

export default function Listings() {
  const listings = [
    {
      "_id": "66d748bc468beb2b9fdf6323",
      "title": "Lost Wallet",
      "description": "A black leather wallet containing important IDs and some cash. Lost near the MRU library.",
      "category": "Accessories",
      "location": "MRU Library",
      "image": "https://i.etsystatic.com/12692299/r/il/4e0827/5260854200/il_300x300.5260854200_lfcz.jpg",
      "status": "Lost",
      "contactInfo": "contact@gmail.com",
      "postedBy": "uploaded by mawa"
    },
    {
      "_id": "66d748bc468beb2b9fdf6324",
      "title": "Found Keys",
      "description": "A set of house keys with a red keychain. Found near the parking lot.",
      "category": "Accessories",
      "location": "MRU Parking Lot",
      "image": "https://i.etsystatic.com/12692299/r/il/4e0827/5260854200/il_300x300.5260854200_lfcz.jpg",
      "status": "Found",
      "contactInfo": "founditems@gmail.com",
      "postedBy": "uploaded by john"
    },
    {
      "_id": "66d748bc468beb2b9fdf6325",
      "title": "Lost Phone",
      "description": "A black iPhone 13 in a transparent case. Last seen in the cafeteria.",
      "category": "Electronics",
      "location": "MRU Cafeteria",
      "image": "https://i.etsystatic.com/12692299/r/il/4e0827/5260854200/il_300x300.5260854200_lfcz.jpg",
      "status": "Lost",
      "contactInfo": "iphoneowner@gmail.com",
      "postedBy": "uploaded by sarah"
    },
    {
      "_id": "66d748bc468beb2b9fdf6326",
      "title": "Found Watch",
      "description": "A silver wristwatch found in the gym locker room.",
      "category": "Accessories",
      "location": "MRU Gym",
      "image": "https://i.etsystatic.com/12692299/r/il/4e0827/5260854200/il_300x300.5260854200_lfcz.jpg",
      "status": "Found",
      "contactInfo": "gymstaff@gmail.com",
      "postedBy": "uploaded by mike"
    },
    {
      "_id": "66d748bc468beb2b9fdf6327",
      "title": "Lost Backpack",
      "description": "A black backpack containing books and a laptop. Lost near the science building.",
      "category": "Bags",
      "location": "MRU Science Building",
      "image": "https://i.etsystatic.com/12692299/r/il/4e0827/5260854200/il_300x300.5260854200_lfcz.jpg",
      "status": "Lost",
      "contactInfo": "backpacklost@gmail.com",
      "postedBy": "uploaded by alex"
    },
    {
      "_id": "66d748bc468beb2b9fdf6328",
      "title": "Found Glasses",
      "description": "A pair of reading glasses found in the library study area.",
      "category": "Accessories",
      "location": "MRU Library",
      "image": "https://i.etsystatic.com/12692299/r/il/4e0827/5260854200/il_300x300.5260854200_lfcz.jpg",
      "status": "Found",
      "contactInfo": "librarystaff@gmail.com",
      "postedBy": "uploaded by anna"
    },
    {
      "_id": "66d748bc468beb2b9fdf6329",
      "title": "Lost Laptop Charger",
      "description": "A MacBook charger left behind in the computer lab.",
      "category": "Electronics",
      "location": "MRU Computer Lab",
      "image": "https://i.etsystatic.com/12692299/r/il/4e0827/5260854200/il_300x300.5260854200_lfcz.jpg",
      "status": "Lost",
      "contactInfo": "lostcharger@gmail.com",
      "postedBy": "uploaded by lucas"
    },
    {
      "_id": "66d748bc468beb2b9fdf6330",
      "title": "Found Water Bottle",
      "description": "A blue stainless steel water bottle found in the auditorium.",
      "category": "Accessories",
      "location": "MRU Auditorium",
      "image": "https://i.etsystatic.com/12692299/r/il/4e0827/5260854200/il_300x300.5260854200_lfcz.jpg",
      "status": "Found",
      "contactInfo": "auditoriumstaff@gmail.com",
      "postedBy": "uploaded by emma"
    },
    {
      "_id": "66d748bc468beb2b9fdf6331",
      "title": "Lost Headphones",
      "description": "A pair of white AirPods lost near the sports field.",
      "category": "Electronics",
      "location": "MRU Sports Field",
      "image": "https://i.etsystatic.com/12692299/r/il/4e0827/5260854200/il_300x300.5260854200_lfcz.jpg",
      "status": "Lost",
      "contactInfo": "lostairpods@gmail.com",
      "postedBy": "uploaded by jessica"
    },
    {
      "_id": "66d748bc468beb2b9fdf6332",
      "title": "Found Umbrella",
      "description": "A black umbrella found in the student center.",
      "category": "Accessories",
      "location": "MRU Student Center",
      "image": "https://i.etsystatic.com/12692299/r/il/4e0827/5260854200/il_300x300.5260854200_lfcz.jpg",
      "status": "Found",
      "contactInfo": "foundumbrella@gmail.com",
      "postedBy": "uploaded by ryan"
    }
  ]
  

  const [searchParams, setSearchParams] = useSearchParams({
    status: "",
    category: "",
  });

  const statusParam = searchParams.get("status");
  const categoryParam = searchParams.get("category");

  const categories = [
    "Electronics",
    "Books",
    "Clothing",
    "Accessories",
    "Others",
  ];
  const statuses = ["Lost", "Found"];
  const [filteredItems, setFilteredItems] = useState([]);

  const filterListings = () => {
    if (categoryParam && statusParam) {
      return listings.filter(
        (listing) =>
          listing.category === categoryParam && listing.status === statusParam
      );
    } else if (categoryParam) {
      return listings.filter((listing) => listing.category === categoryParam);
    } else if (statusParam) {
      return listings.filter((listing) => listing.status === statusParam);
    } else {
      return listings;
    }
  };
          
  useEffect(() => {
    setFilteredItems(filterListings());
      console.log(filteredItems);
  }, [statusParam, categoryParam]);

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
      <div className="w-full min-h-90vh sm:py-10 pt-6 flex flex-wrap pb-10 justify-center items-center gap-5">
        {filteredItems.length > 0
          ? filteredItems.map((item) => (
              <ItemPostComp key={item._id} data={item} />
            ))
          : "No items found."}
      </div>
    </div>
  );
}
