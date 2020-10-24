/* eslint-disable array-callback-return */
import React from "react";

const AddFoodItem = (props) => {
  let bb = props.All.map((type) => {
    return (
      <option key={type.categoryType} value={type.categoryType}>
        {type.categoryType}
      </option>
    );
  });
  let type = props.foodType;
  var i = -1;
  let a = props.All.map((item) => {
    i++;
    if (type === item.categoryType) {
      return props.All[i].categorySubType.map((sub) => {
        return (
          <option key={sub} value={sub}>
            {sub}
          </option>
        );
      });
    }
  });

  return (
    <div className="container">
      <form onSubmit={props.addFoodItem}>
        <div className="form-group">
          <input
            id="foodType"
            placeholder="Food Type"
            type="text"
            className="form-control"
            name="foodType"
            value={props.foodType}
            onChange={props.handleInputChange}
            required
            list="exampleList"
          />

          <datalist id="exampleList">{bb}</datalist>
        </div>

        <div className="form-group">
          <input
            id="food"
            placeholder="Enter Food Name"
            type="text"
            className="form-control"
            name="food"
            value={props.food}
            onChange={props.handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            min="1"
            placeholder="Enter Food price"
            type="number"
            className="form-control"
            name="cost"
            value={props.cost}
            onChange={props.handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            id="description"
            placeholder="Enter Food Description"
            type="text"
            className="form-control"
            name="description"
            value={props.description}
            onChange={props.handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            placeholder="Enter Food URL"
            type="text"
            className="form-control"
            name="url"
            value={props.url}
            onChange={props.handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <select
            id="foodSubType"
            placeholder="select your beverage"
            className="form-control"
            name="foodSubType"
            value={props.foodSubType}
            onChange={props.handleInputChange}
            required
          >
            {a}
          </select>
        </div>

        <button
          onClick={() => props.AddToAPI()}
          id="add"
          className="btn btn-success mt-2"
        >
          {" "}
          Add To Menu{" "}
        </button>
      </form>
    </div>
  );
};

export default AddFoodItem;
