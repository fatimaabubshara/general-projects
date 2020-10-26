import React from "react"
import FoodItemList from "./partials/FoodItemList"
import AddFoodItem from "./partials/AddFoodItem"
import logo from "../../assets/menu.png"
import TabSelector from "../../TabSelector"
import ModalHeader from "react-bootstrap/ModalHeader"
import ModalBody from "react-bootstrap/ModalBody"
import {
  fetchFoodAPI,
  fetchAPIAddnewFood,
  valid,
} from "../action"
import Modal from "../Modal"
import "../../style.scss"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      categorysData: [],
      New: [],
      newTypeFood: "",
      newSub: [],
      activeId: "home",
    }
    this.handleChangeTab = this.handleChangeTab.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleChangeTab(event) {
    const buttonId = event.target.id
    this.setState({ activeId: buttonId })
  }

  componentDidMount() {
    fetchFoodAPI().then((data) => {
      console.log(data)
      this.setState({ categorysData: data })
    })
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }
  save() {
    fetchAPIAddnewFood().then((success) => {
      if (success) {
        alert("The menu Food is Added to DataBase ")
      } else {
        alert("The menu Food is Not Added to DataBase !!! , Try again")
      }
    })
    fetchAPIAddnewFood().then((data) => {
      var item = []
      item.push(this.state.newSub)
      this.setState({ newSub: item })

      this.state.New.push({
        categoryType: this.state.newTypeFood,
        categorySubType: this.state.newSub,
      })

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

  getTabContent() {
    switch (this.state.activeId) {
      case "addFood":
        return (
          <div>
            <div>
              <h1 className="headerAdd">Adding Food</h1>
            </div>
            {this.state.categorysData && this.state.categorysData.length ?
                <AddFoodItem
                  data={this.state.categorysData}
                  initialValues={{foodType: this.state.categorysData && this.state.categorysData[0].categoryType}}
              />
              :
              <div>Loading Data ...</div>
            }
          </div>
        )
      case "allFood":
        return (
          <div>
            <h1 className="headerAdd">Food Item List</h1>
            <FoodItemList />
          </div>
        )
      case "addType":
        return (
          <div>
            <h1 className="headerAdd"> ADD New Type Food</h1>
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
        )
      default:
        return
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
                activeId={this.state.activeId}
                handleChangeTab={this.handleChangeTab}
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
    )
  }
}

export default App
