import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import DisplayFood from "./DisplayFood";
const Track = () => {
  const loggedInDetails = useContext(AuthContext);

  const [searchedFoodItems, setSearchedFoodItems] = useState([]);
  const [clickedFoodItem, setClickedFoodItem] = useState(null);

  useEffect(() => {
    console.log("clickedFoodItem", clickedFoodItem);
  });

  const handleSearchInput = async (event) => {
    console.log(event.target.value);
    console.log(loggedInDetails);
    try {
      if (event.target.value.length > 0) {
        const response = await axios.get(
          `https://nutricalc-m5s7.onrender.com/foods/${event.target.value}`,
          {
            headers: {
              Authorization: `Bearer ${loggedInDetails.isLoggedIn.token}`,
            },
          }
        );
        console.log(response);
        if (response.data.message === undefined) {
          setSearchedFoodItems(response.data);
          // setSearchedFoodItems([]);
        } else setSearchedFoodItems([]);
      } else {
        setSearchedFoodItems([]);
      }
    } catch (error) {
      console.log("Error in fetching food item", error);
    }
  };

  return (
    <>
      <section className="container track-container">
        <div className="search">
          <input
            type="search"
            placeholder="Search Food Items"
            className="search-input"
            onChange={handleSearchInput}
          />
          {searchedFoodItems.length !== 0 ? (
            <div className="search-result">
              {searchedFoodItems.map((item) => {
                return (
                  <p
                    key={item._id}
                    onClick={() => {
                      setClickedFoodItem(item);
                    }}
                  >
                    {item.name}
                  </p>
                );
              })}
            </div>
          ) : null}
        </div>
        {clickedFoodItem !== null ? (
          <DisplayFood clickedFoodItem={clickedFoodItem} />
        ) : null}
      </section>
    </>
  );
};

export default Track;
