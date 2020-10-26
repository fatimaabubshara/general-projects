import React from "react";
import FoodItemList from "./partials/FoodItemList";
import AddFoodItem from "./partials/AddFoodItem";
import logo from "../../assets/menu.png";
import TabSelector from "../../TabSelector";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalBody from "react-bootstrap/ModalBody";
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
      activeId: "home",
    };
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.deleteFoodItem = this.deleteFoodItem.bind(this);
    this.addFoodItem = this.addFoodItem.bind(this);
    this.AddToAPI = this.AddToAPI.bind(this);
  }
  handleChangeTab(event) {
    const buttonId = event.target.id;
    this.setState({ activeId: buttonId });
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
  logout() {
    window.location.href = "login-page/container.jsx";
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
  getTabContent() {
    const { foodItems } = this.state;
    switch (this.state.activeId) {
      case "addFood":
        return (
          <div>
            <h class="headerAdd">Adding Food</h>
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
          </div>
        );
      case "allFood":
        return (
          <div>
            <h class="headerAdd">Food Item List</h>
            <FoodItemList
              id="list"
              foodItems={foodItems}
              deleteFoodItem={this.deleteFoodItem}
              Menu={this.state.Menu}
            />
          </div>
        );
      case "addType":
        return (
          <div>
            <h class="headerAdd"> ADD New Type Food</h>
            <div className="Modal">
              <Modal className="Modal1">
                <ModalHeader className="ModalHeader">Modal Header</ModalHeader>
                <ModalBody>
                  <div>
                    <input
                      className="inputModal"
                      required
                      placeholder="New Type Food"
                      type="text"
                      name="newTypeFood"
                      id="newTypeFood"
                      value={this.state.newTypeFood}
                      onChange={this.handleInputChange}
                    />
                    <input
                      className="inputModal"
                      placeholder="New Sub Type Food"
                      type="text"
                      ref="newtext"
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
                      ADD Food Type
                    </button>
                  </div>
                </ModalBody>
              </Modal>
            </div>
          </div>
        );
      default:
        return;
    }
  }
  render() {
    return (
      <div className="App">
        <div className="topnav">
          <a href="#home" id="mobilea">
            <img alt="menu1" id="menu1" src={logo} />
          </a>

          <a id="username" href="#news">
            Username{" "}
          </a>
          <button onClick={this.logout} id="imgButton">
            <img
              alt="user"
              id="img"
              src="https://www.kindpng.com/picc/m/19-194798_transparent-logout-png-sign-out-icon-transparent-png.png"
            />
          </button>
          <div className="App">
            <div className="App">
              <TabSelector
                handleChangeTab={this.handleChangeTab}
                activeId={this.state.activeId}
              />
              <div className="App-content">{this.getTabContent()}</div>
            </div>

            <img
              alt="menu"
              id="menu"
              src="https://icon-library.com/images/white-menu-icon/white-menu-icon-12.jpg"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
