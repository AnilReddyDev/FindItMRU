import React from "react";
import ItemPostComp from "../Components/ItemPostComp";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function ProfilePage() {
  const { id } = useParams();
  const [fetchedListings, setFetchedListings] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [cardReload, setCardReload] = useState([]);
  const navigate = useNavigate();
  const fetchListings = async () => {
    try {
      const response = await axios.get("/api/v1/item/myitems");
      setFetchedListings(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const logOut = async () => {
    try {
      const response = await axios.delete("/api/v1/user/auth/logout");
      localStorage.removeItem("userExists");
      localStorage.removeItem("userInfo");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (itemid) => {
    setCardReload((prevItems) =>
      prevItems.filter((item) => item._id !== itemid)
    );
  };

  useEffect(() => {
    fetchListings();
    setUserDetails(JSON.parse(localStorage.getItem("userInfo")));
  }, [cardReload]);
  const listings = fetchedListings.filter((item) => item.postedBy === id);

  return (
    <div className="min-h-screen   box-border w-full poppins bg-gradient-to-t pt-14   from-primary/[0.90] to-primary   text-primary-light flex flex-col justify-start  items-center">
      <div className="w-full h-10vh"></div>
      <img
        className="rounded-full h-40 w-40"
        src={JSON.parse(localStorage.getItem("userInfo"))?.picture}
        alt="profile"
      />
      <div className="flex flex-col text-lg gap-2 mt-6 mb-12">
        <h1 className="pt-2">Name : {userDetails.name}</h1>
        <h1 className="pt-2 pb-3">Email : {userDetails.email}</h1>
        <div className="flex gap-4 justify-center"> 
        <button
            className="text-red bg-gradient-to-r px-3 py-1 text-white  gap-2 rounded-md text-base from-red-700 to-red-600  flex items-center justify-end  cursor-pointer font-medium "
            onClick={logOut}
            >
          Log Out
        </button>
        { userDetails.isAdmin && <button
              className="text-red bg-gradient-to-r px-3 py-1 text-white  gap-2 rounded-md text-base from-orange-600 to-orange-500  flex items-center justify-end  cursor-pointer font-medium "
          onClick={() => navigate("/ap?status=RequestsinReview")}
        >
          Admin
        </button>}
        </div>
      </div>
      <div className="w-full h-auto mt-10 flex flex-col items-center">
        <h1 className="text-xl font-medium underline underline-offset-4 ">
          My Listings
        </h1>
        <div className="w-full mt-4 p-5  flex flex-wrap justify-center items-center gap-2">
          {listings.map((item) => (
            <ItemPostComp
              approvalStatus={item.approvalStatus}
              userid={id}
              key={item._id}
              data={item}
              onDelete={handleDelete}
              onProfilePage={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
