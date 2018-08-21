import React, { Component } from "react";
import "./Home.css";


export default class Home extends Component {

  constructor(props) {
    super(props);
   
    this.state = {
      isLoading: false,
      email: this.props.theEmail
    }
    console.log("EMAIL IS: " + this.props.theEmail);
   }


  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Home</h1>
       {this.state.email}
        </div>
      </div>
    );
  }
}