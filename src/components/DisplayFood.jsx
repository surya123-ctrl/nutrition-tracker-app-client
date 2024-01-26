import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const DisplayFood = ({ clickedFoodItem }) => {
  const loggedInDetails = useContext(AuthContext);
  const [eatenGrams, setEatenGrams] = useState(100);
  const [foodItem, setFoodItem] = useState({});
  const [foodItemInitial, setFoodItemInitial] = useState({});

  useEffect(() => {
    // console.log(foodItem);
    console.log(foodItem._id);
    setFoodItem(clickedFoodItem);
    setFoodItemInitial(clickedFoodItem);
  }, [clickedFoodItem]);

  const calculateMacros = (event) => {
    if (event.target.value.length !== 0) {
      const grams = Number(event.target.value);
      setEatenGrams(grams);
      let copiedFoodItem = { ...foodItem };
      copiedFoodItem.calories = (foodItemInitial.calories * grams) / 100;
      copiedFoodItem.protein = (foodItemInitial.protein * grams) / 100;
      copiedFoodItem.carbohydrates =
        (foodItemInitial.carbohydrates * grams) / 100;
      copiedFoodItem.fat = (foodItemInitial.fat * grams) / 100;
      copiedFoodItem.fibre = (foodItemInitial.fibre * grams) / 100;
      setFoodItem(copiedFoodItem);
    }
  };

  const trackFood = async () => {
    console.log(loggedInDetails);
    const trackData = {
      userId: loggedInDetails.isLoggedIn.userId,
      foodId: foodItem._id,
      details: {
        protein: foodItem.protein,
        carbohydrates: foodItem.carbohydrates,
        fat: foodItem.fat,
        fibre: foodItem.fibre,
        calories: foodItem.calories,
      },
      quantity: eatenGrams,
    };
    console.log(trackData);
    console.log(loggedInDetails);
    try {
      const response = await axios.post(
        "http://localhost:8000/track",
        trackData,
        {
          headers: {
            Authorization: `Bearer ${loggedInDetails.isLoggedIn.token}`,
          },
        }
      );
      console.log(response);
      console.log(foodItem);
      setTimeout(() => {
        toast.success(`${foodItem.name} ${eatenGrams}g added Successfully!`);
      }, 2500);
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        toast.error(`Cannot add ${foodItem.name} Successfully!`);
      }, 2500);
    }
  };

  return (
    <div className="displayFood-container">
      <h3>
        {foodItem.name} ({foodItem.calories} cal for {eatenGrams}g)
      </h3>
      <div className="food-item-display">
        <div className="nutrients">
          <p className="nutrient-title">Protein</p>
          <p className="nutrient-value">{foodItem.protein}g</p>
        </div>
        <div className="nutrients">
          <p className="nutrient-title">Carbohydrates</p>
          <p className="nutrient-value">{foodItem.carbohydrates}g</p>
        </div>
        <div className="nutrients">
          <p className="nutrient-title">Fat</p>
          <p className="nutrient-value">{foodItem.fat}g</p>
        </div>
        <div className="nutrients">
          <p className="nutrient-title">Fibre</p>
          <p className="nutrient-value">{foodItem.fibre}g</p>
        </div>
        <input
          type="number"
          placeholder="Enter quantity in grams."
          name=""
          id=""
          onChange={calculateMacros}
        />
        <button onClick={trackFood}>Track this food</button>
      </div>
    </div>
  );
};

export default DisplayFood;
