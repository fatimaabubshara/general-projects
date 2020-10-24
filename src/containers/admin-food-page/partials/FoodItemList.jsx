import React from "react";
const FoodItemList = (props) => {
  return (
    <div id="menutable">
      <div id="list">
        {props.foodItems.length > 0 ? (
          props.foodItems.map((foodItem) => (
            <tr id="tr" key={foodItem.id}>
              <div id="all">
                <img alt="img" id="imgfood" src={foodItem.url} />
                <div id="info">
                  <p id="food">{foodItem.food}</p>
                  <p className="cost">{foodItem.cost}$</p>
                  <p id="sub" className="cost">
                    {foodItem.foodSubType}
                  </p>
                  <p className="des"> {foodItem.foodType}</p>
                  <p id="desc" className="des">
                    {" "}
                    {foodItem.description}
                  </p>
                  <button
                    id="delete"
                    className="btn btn-danger ml-2"
                    onClick={() => props.deleteFoodItem(foodItem.id)}
                  >
                    X
                  </button>
                </div>
              </div>
              <div></div>
            </tr>
          ))
        ) : (
          <tr></tr>
        )}
      </div>
    </div>
  );
};
export default FoodItemList;
