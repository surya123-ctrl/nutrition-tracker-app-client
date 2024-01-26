import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
const TrackFoodByDate = () => {
  const loggedInDetails = useContext(AuthContext);

  const [date, setDate] = useState(new Date());

  const [items, setItems] = useState([]);

  const [total, setTotal] = useState({
    totalCalories: 0,
    totalProtein: 0,
    totalCarbohydrates: 0,
    totalFat: 0,
    totalFibre: 0,
  });

  const calculateTotal = () => {
    let newTotal = {
      totalCalories: 0,
      totalProtein: 0,
      totalCarbohydrates: 0,
      totalFat: 0,
      totalFibre: 0,
    };
    items.forEach((item) => {
      newTotal.totalCalories += item.details.calories;
      newTotal.totalProtein += item.details.protein;
      newTotal.totalCarbohydrates += item.details.carbohydrates;
      newTotal.totalFat += item.details.fat;
      newTotal.totalFibre += item.details.fibre;
    });
    setTotal(newTotal);
  };

  useEffect(() => {
    calculateTotal();
    const fetchFoodByDate = async () => {
      try {
        console.log(loggedInDetails);
        const response = await axios.get(
          `http://localhost:8000/track/${loggedInDetails.isLoggedIn.userId}/${
            date.getMonth() + 1
          }-${date.getDate()}-${date.getFullYear()}`,
          {
            headers: {
              Authorization: `Bearer ${loggedInDetails.isLoggedIn.token}`,
            },
          }
        );
        setItems(response.data);
        console.log(items);
        console.log(response);
      } catch (error) {
        console.log("Error in fetching data", error);
      }
    };
    fetchFoodByDate();
  }, [date]);
  useEffect(() => {
    calculateTotal();
  }, [items]);
  return (
    <section className="container trackFoodByDate-container">
      <h2>Track Food By Date</h2>
      {items && items.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>Food Items</th>
                <th>Quantity </th>
                <th>Protein</th>
                <th>Carbohydrates</th>
                <th>Fat</th>
                <th>Fibre</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>
                      <b>{item.foodId.name}</b>
                    </td>
                    <td>{item.quantity.toFixed(2)}g</td>
                    <td>{item.details.protein.toFixed(2)}g</td>
                    <td>{item.details.carbohydrates.toFixed(2)}g</td>
                    <td>{item.details.fat.toFixed(2)}g</td>
                    <td>{item.details.fibre.toFixed(2)}g</td>
                    <td>{item.details.calories.toFixed(2)}cals</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="total-section">
            <p>Total:</p>
            <p>{total.totalProtein.toFixed(2)}g Protein</p>
            <p>{total.totalCarbohydrates.toFixed(2)}g Carbohydrates</p>
            <p>{total.totalFat.toFixed(2)}g Fat</p>
            <p>{total.totalFibre.toFixed(2)}g Fiber</p>
            <p>{total.totalCalories.toFixed(2)} Calories</p>
            <input
              type="date"
              onChange={(event) => {
                setDate(new Date(event.target.value));
              }}
            />
          </div>
        </>
      ) : (
        <p>No items to display.</p>
      )}
    </section>
  );
};

export default TrackFoodByDate;
