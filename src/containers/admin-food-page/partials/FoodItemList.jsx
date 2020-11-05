import React from "react";
import { connect } from "react-redux";
import { createPropsSelector } from "reselect-immutable-helpers";
import { getProducts } from "../../../shared/store/selectors/productsSelector";
import { getAllFoodAPI } from "../../action";
import * as types from "../../../shared/store/actions/types";
import { fetchAPIAddFood } from "../../action";

class FoodItemList extends React.Component {
  constructor(props) {
    super(props);

    this.deleteContact = this.deleteContact.bind(this);
  }

  componentWillMount() {
    this.props.getAllFoodAPI();
  }

  deleteContact() {
    this.props.deleteContact(this.props.products.id);
  }
  render() {
    const { products } = this.props;
    return (
      <div class="grid-container">
        {products && products.length > 0 ? (
          products.map((foodItem) => (
            <div id="tr" key={foodItem.id}>
              <img id="imgfood" src={foodItem.imageUrl} />
              <table id="info">
                <tr>
                  <td>{foodItem.subType}</td>
                  <td>{foodItem.price}$</td>
                </tr>
                <tr>
                  <td>{foodItem.name}</td>
                  <td>{foodItem.type}</td>
                </tr>
          <tr>{foodItem.desc}</tr>
              </table>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

const mapStateToProps = createPropsSelector({
  products: getProducts,
});

const mapDispatchToProps = (dispatch) => ({
  getAllFoodAPI: () => dispatch(getAllFoodAPI()),
  deleteContact: () => dispatch(types.deleteContact()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodItemList);
