import React from "react";
import axios from "axios";
export default function ItemPostComp({
  data,
  userid,
  approvalStatus,
  onAdminPage,
  onDelete,
  onApproval,
  isAdmin,
}) {
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

  const onApprovalBtn = async (itemId) => {
    try {
      const response = await axios.put(`/api/v1/item/approve/${itemId}`);
      onApproval(data._id);
    } catch (error) {
      console.log(error);
    }
  }
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

  const deleteItemByAdmin = async (itemid, userid) => {
    try {
      const response = await axios.delete(
        `/api/v1/item/admin/delete/${itemid}/${userid}`
      );
      // console.log("deleteItemByAdmin: ", response);
      onDelete(itemid);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sm:w-60 min-h-96 px-2 py-2 rounded-md bg-white/[0.85] ">
      {/* profile page delete button  */}
      {data.postedBy === userid && !onAdminPage && (
        <div className=" flex  py-2 justify-between items-center">
          {approvalStatus === false ? (
            <p className="text-white bg-gradient-to-r px-2 py-2  gap-2 rounded-lg from-yellow-600 to-yellow-500 text-base  font-normal flex items-center justify-end  cursor-default ">
              Pending
            </p>
          ) : (
            <p className="text-white bg-gradient-to-r px-2 py-2  gap-1 rounded-lg from-green-600 to-green-500 text-base cursor-default  font-normal flex items-center justify-end   ">
              Approved
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5 text-green"
              >
                <path
                  fillRule="evenodd"
                  d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clipRule="evenodd"
                />
              </svg>
            </p>
          )}
          <button
            onClick={() => deleteItem(data._id, userid)}
            className="text-red bg-gradient-to-r px-2 py-2 text-white  gap-2 rounded-lg from-red-600 to-red-500  flex items-center justify-end  cursor-pointer font-bold text-lg"
          >
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
            <p className=" font-normal text-sm">Delete</p>
          </button>
        </div>
      )}

      {/* Admin panel buttons */}
      {isAdmin && (
        <div className=" flex  py-2 justify-between items-center">
          <button
            onClick={() => deleteItemByAdmin(data._id, userid)}
            className="text-red bg-gradient-to-r px-2 py-2  gap-2 rounded-lg from-red-600 to-red-500  flex items-center justify-end  cursor-pointer font-bold text-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                clipRule="evenodd"
              />
            </svg>
            <p className=" font-normal text-sm">Delete</p>
          </button>
          <button
            onClick={() => onApprovalBtn(data._id)}
            className="text-white bg-gradient-to-r px-2 py-2  gap-2 rounded-lg from-green-600 to-green-500  flex items-center justify-end  cursor-pointer font-bold text-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5 text-green"
            >
              <path
                fillRule="evenodd"
                d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clipRule="evenodd"
              />
            </svg>
            <p className=" font-normal text-sm">approve</p>
          </button>
        </div>
      )}
      <img src={data.image} className="w-full rounded-md" alt="image" />
      <div className="pt-2 box-border text-black">
        <h1 className="text-lg tracking-wide font-medium ">
          Title: <span className="font-normal">{data.title}</span>{" "}
        </h1>
        <h1 className="text-lg tracking-wide font-medium ">
          Location: <span className="font-normal">{data.location}</span>{" "}
        </h1>
        <h1 className="text-lg tracking-wide font-medium ">
          Date: <span className="font-normal">{Date.now()}</span>
        </h1>
        {onAdminPage && <h1 className="text-lg tracking-wide font-medium ">
          Approved by : <span className="font-normal">{data.approvalByName}</span>
        </h1>}
      </div>
    </div>
  );
}
