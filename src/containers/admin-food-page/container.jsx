import React from "react";
import FoodItemList from "./partials/FoodItemList";
import AddFoodItem from "./partials/AddFoodItem";
import logo from "../../assets/menu.png";
import {
  fetchFoodAPI,
  fetchAPIAddFood,
  fetchAPIAddnewFood,
  valid,
} from "../action";
import Modal from "../Modal";
import "../../style.scss";


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      id: null,
      userId: 1,
      food: "",
      foodType: "",
      foodSubType: "",
      url: "",
      cost: "",
      description: "",
      status: false,
      foodItem: {},
      foodItems: [],
      editing: false,
      All: [],
      Menu: [],
      New: [],
      newTypeFood: "",
      newSub: [],
      showing: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.deleteFoodItem = this.deleteFoodItem.bind(this);
    this.addFoodItem = this.addFoodItem.bind(this);
    this.AddToAPI = this.AddToAPI.bind(this);
  }
  componentDidMount() {
    fetchFoodAPI().then((data) => {
      console.log(data);
      this.setState({ All: data });
      this.setState({ foodType: data[0].categoryType });
    });
    fetchFoodAPI().then((success) => {
      if (success) {
        alert("Right !");
      } else {
        alert("Wrong !");
      }
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }
  addFoodItem(event) {
    event.preventDefault();
    if (!this.state.food) return;
    const foodItem = {
      id: this.state.foodItems.length + 1,
      food: this.state.food,
      cost: this.state.cost,
      description: this.state.description,
      foodType: this.state.foodType,
      newTypeFood: this.state.newTypeFood,
      foodSubType: this.state.foodSubType,
      url: this.state.url,
      userId: this.state.userId,
      statu: this.state.status,
      showing: this.state.showing,
    };
    this.setState({
      food: "",
      cost: "",
      description: "",
      foodSubType: "",
      newTypeFood: "",
      newSub: "",
      foodType: "",
      url: "",
      foodItem: foodItem,
      showing: "",
      showingsub: "",
      foodItems: [...this.state.foodItems, foodItem],
    });
  }
  save() {
    fetchAPIAddnewFood().then((success) => {
      if (success) {
        alert("The menu Food is Added to DataBase ");
      } else {
        alert("The menu Food is Not Added to DataBase !!! , Try again");
      }
    });
    fetchAPIAddnewFood().then((data) => {
      var item = [];
      item.push(this.state.newSub);
      this.setState({ newSub: item });

      this.state.New.push({
        categoryType: this.state.newTypeFood,
        categorySubType: this.state.newSub,
      });

      fetchAPIAddnewFood(this.state.New);
      console.log(data);
    });
  }

  deleteFoodItem(id) {
    const foodItems = this.state.foodItems.filter((item) => item.id !== id);
    this.setState({ foodItems: foodItems });
    if (this.state.editing === true) {
      window.location.reload();
    }
  }
  AddToAPI() {
    fetchAPIAddFood().then((success) => {
      if (success) {
        alert("The menu Food is Added to DataBase ");
      } else {
        alert("The menu Food is Not Added to DataBase !!! , Try again");
      }
    });
    fetchAPIAddFood().then((data) => {
      this.state.Menu.push({
        imageUrl: this.state.foodItem.url,
        name: this.state.foodItem.food,
        price: this.state.foodItem.cost,
        type: this.state.foodItem.foodType,
        subType: this.state.foodItem.foodSubType,
      });

      fetchAPIAddFood(this.state.Menu);
      console.log(data);
    });
  }

  render() {
    const { foodItems } = this.state;
    return (
      <div className="App">
        <div className="topnav">
          <a className="active" href="#home">
            Welcome
          </a>
          <a href="#home" id="mobilea">
            {" "}
            , UserName
            <img alt="menu1" id="menu1" src={logo} />
          </a>

          <a id="username" href="#news">
            Username{" "}
          </a>
          <img
            alt="user"
            id="img"
            src="https://t3.ftcdn.net/jpg/01/44/52/94/240_F_144529471_9LhgvhXAYfy50nDjir1aadtMuiMiYUDX.jpg"
          />

          <img
            alt="menu"
            id="menu"
            src="https://icon-library.com/images/white-menu-icon/white-menu-icon-12.jpg"
          />
        </div>
        <div className="container">
          <div className="row App-main">
            {
              <AddFoodItem
                food={this.state.food}
                cost={this.state.cost}
                description={this.state.description}
                url={this.state.url}
                SubType={this.state.SubType}
                All={this.state.All}
                foodType={this.state.foodType}
                foodSubType={this.state.foodSubType}
                handleInputChange={this.handleInputChange}
                addFoodItem={this.addFoodItem}
                newTypeFood={this.state.newTypeFood}
                AddToAPI={this.AddToAPI}
                AddNewType={this.AddNewType}
              />
            }
          </div>

          <div className="vl"></div>
          <div id="divapp" className="col-4">
            <FoodItemList
              id="list"
              foodItems={foodItems}
              deleteFoodItem={this.deleteFoodItem}
            />
          </div>
        </div>
        <div id="block">
          <div>
            <button
              id="plus1"
              className="plus"
              onClick={() => this.setState({ showing: !this.state.showing })}
            >
              +
            </button>
            {this.state.showing ? (
              <div className="Modal">
                <Modal>
                  <div>
                    <input
                      required
                      placeholder="New Type Food"
                      type="text"
                      name="newTypeFood"
                      id="newTypeFood"
                      value={this.state.newTypeFood}
                      onChange={this.handleInputChange}
                    />
                    <input
                      placeholder="New Sub Type Food"
                      type="text"
                      name="newSub"
                      id="newSub"
                      value={this.state.newSub}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div>
                    <button
                      disabled={
                        !valid(this.state.newTypeFood, this.state.newSub)
                      }
                      onClick={() => this.save()}
                      type="button"
                    >
                      Save
                    </button>
                  </div>
                </Modal>
              </div>
            ) : null}
            <div id="blocksub"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
