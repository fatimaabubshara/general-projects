import React from "react"
import { connect } from "react-redux"
import {createPropsSelector} from 'reselect-immutable-helpers'
import { getProducts } from "../../../shared/store/selectors/productsSelector"
import { getAllFoodAPI } from "../../action"
class FoodItemList extends React.Component {
  constructor() {
    super()
    this.state = {
      foodItems: []
    }
    this.deleteFoodItem = this.deleteFoodItem.bind(this)
  }

  componentWillMount() {
    this.props.getAllFoodAPI()
  }

  deleteFoodItem(id) {
    // TODO: Fatima work on this function to remove from DB
  }

  render() {
    const {products} = this.props
      return (
      <div id="menutable">
        <div id="list">
          {products && products.length > 0 ? (
            products.map((foodItem) => (
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
                      onClick={() => this.deleteFoodItem(foodItem.id)}
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
    )}
}

const mapStateToProps = createPropsSelector({
  products: getProducts
})

const mapDispatchToProps = dispatch => ({
  getAllFoodAPI: () => dispatch(getAllFoodAPI())
})

export default connect(
  mapStateToProps ,
  mapDispatchToProps
)(FoodItemList)
