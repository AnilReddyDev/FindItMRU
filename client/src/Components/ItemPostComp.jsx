import React from "react";
import axios from "axios";
export default function ItemPostComp({ data,userid,onDelete }) {
  // const data = {
  //     "_id": "66d748bc468beb2b9fdf6330",
  //     "title": "Found Water Bottle",
  //     "description": "A blue stainless steel water bottle found in the auditorium.",
  //     "category": "Accessories",
  //     "location": "MRU Auditorium",
  //     "image": "https://i.etsystatic.com/12692299/r/il/4e0827/5260854200/il_300x300.5260854200_lfcz.jpg",
  //     "status": "Found",
  //     "contactInfo": "auditoriumstaff@gmail.com",
  //     "postedBy": "uploaded by emma"
  //   }

  const deleteItem = async (itemid, userid) => {
    try {
      const response = await axios.delete(
        `/api/v1/item/delete/${itemid}/${userid}`
      );
      // console.log(response);
      onDelete(itemid); 
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="sm:w-60 min-h-96 px-2 py-2 rounded-md bg-white/[0.85] ">
      {(data.postedBy === userid) && 
      <button onClick={() => deleteItem(data._id,userid)} className="text-red-600 w-full flex items-center justify-end pb-2 cursor-pointer font-bold text-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>

      }
      <img src={data.image} className="w-full rounded-md" alt="image" />
      <div className="pt-2 box-border">
        <h1 className="text-lg tracking-wide font-medium ">
          Title: <span className="font-normal">{data.title}</span>{" "}
        </h1>
        <h1 className="text-lg tracking-wide font-medium ">
          Location: <span className="font-normal">{data.location}</span>{" "}
        </h1>
        <h1 className="text-lg tracking-wide font-medium ">
          Date: <span className="font-normal">{Date.now()}</span>
        </h1>
      </div>
    </div>
  );
}
