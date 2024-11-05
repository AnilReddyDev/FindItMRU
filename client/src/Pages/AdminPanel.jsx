import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import ItemPostComp from "../Components/ItemPostComp";
import { useNavigate } from "react-router-dom";
export default function AdminPanel() {
  const statuses = ["RequestsinReview", "YourApprovals", "AllApprovals"];
  const [fetchedListings, setFetchedListings] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [cardReload, setCardReload] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({
    status: "",
  });
  const statusParam = searchParams.get("status");

  const fetchListings = async () => {
    try {
    //   console.log(`entered fetch listings`);
      const response = await axios.get("/api/v1/item/adminitems");
      setFetchedListings(response.data);
    //   console.log("fetchedListings :", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterListings = () => {
    // console.log(`entered filter listings`);
    if (statusParam === "RequestsinReview") {
    //   console.log(`entered requests in review`);
      return fetchedListings.filter(
        (listing) => listing.approvalStatus === false
      );
    } else if (statusParam === "YourApprovals") {
    //   console.log(`entered your approvals`);
      return fetchedListings.filter(
        (listing) => listing.approvalBy === userDetails._id
      );
    } else if (statusParam === "AllApprovals") {
    //   console.log(`entered all approvals`);
      return fetchedListings.filter(
        (listing) => listing.approvalStatus === true
      );
    } else {
      return null;
    }
  };

  const handleApproval = (itemid) => {
    // console.log(`entered handle approval ${itemid}`);
    setCardReload([...cardReload, itemid]);
    // console.log("cardReload", cardReload);
  };

  useEffect(() => {
    fetchListings();
    setUserDetails(JSON.parse(localStorage.getItem("userInfo")));
    if (JSON.parse(localStorage.getItem("userInfo")).isAdmin === false) {
      navigate("/");
    }
  }, [cardReload]);
  useEffect(() => {
    setFilteredItems(filterListings());
  }, [statusParam, fetchedListings]);

  return (
    <div className="min-h-screen text-white poppins  w-full bg-gradient-to-t from-primary/[0.90] to-primary  flex flex-col">
      <div className="w-full h-10vh"></div>
      <div className="w-full  ">
        <div className="w-full h-full pt-5 pb-8 flex items-center justify-center">
          <h1 className="text-2xl underline underline-offset-4  text-white font-medium ">
            Admin Panel
          </h1>
        </div>
        <div className="w-full no-scrollbar h-7vh flex justify-center items-center gap-5 sm:10 overflow-scroll sm:pl-0 pl-48 pr-7 sm:pr-0">
          {/* <button>Requests in Review</button>
            <button>Your Approvals</button> */}
          {statuses.map((status) => (
            <button
              key={status}
              className={` font-normal whitespace-nowrap  rounded-md px-3 py-2 ${
                statusParam === status
                  ? "bg-[#fc4903]/[0.90] text-white"
                  : "bg-white/[0.8] text-secondary"
              }`}
              onClick={() =>
                setSearchParams(
                  (prev) => {
                    prev.set("status", status);
                    return prev;
                  },
                  { replace: true }
                )
              }
            >
              {status === "RequestsinReview" && "Requests in Review"}
              {status === "YourApprovals" && "Your Approvals"}
              {status === "AllApprovals" && "All Approvals"}
            </button>
          ))}
        </div>
        <div className="w-full  sm:py-10 pt-6 px-5 flex flex-wrap pb-10 justify-center items-center gap-5 ">
          {filteredItems.length > 0
            ? filteredItems.map((item) => (
                <ItemPostComp
                  onAdminPage={true}
                  key={item._id}
                  data={item}
                  userid={"66dd508bca2da22d905fdca5"}
                  onApproval={handleApproval}
                  onDelete={handleApproval}
                  isAdmin={true}
                />
              ))
            : "No items found."}
        </div>
      </div>
    </div>
  );
}
