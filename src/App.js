import { LinkContainer } from "react-router-bootstrap";
import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import axios from 'axios';
import Cookies from 'universal-cookie';
import Routes from "./Routes";
import "./App.css";



class App extends Component {

  constructor(props) {
    super(props);
    this.getSession();
    this.state = {
      isAuthenticated: false,
      theEmail:""
    };
  }
  
    userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

   handleLogout = event => {
    this.userHasAuthenticated(false);
    this.props.history.push("/login");
  }
  
  

  getSession(){
    const cookie = new Cookies();
    var theCookie = cookie.get('limonnana');

    if(theCookie !== undefined){
    let token = theCookie.token;
    let userId = theCookie.userId;
    console.log("token:" + token + " userId:" + userId);
    const domain =  process.env.REACT_APP_DOMAIN;
    axios.post(domain + '/getSession', 
    {
      userId: userId, token: token
    })
    .then((response)=> {
        console.log(" this is the response userId: " + response.data.userId);
        
        if(response.data.userId !== undefined){
          console.log("this is the session ");
          this.userHasAuthenticated(true);
        }else{
          console.log(" No Session alive, token expired ");
         // this.props.history.push("/login");
        }
    })
    .catch(function (response) {
       // this.setState({isLoading:false} );
        console.log(response);
    });
    }else{
      console.log(" No Session alive from cookie");
     // this.props.history.push("/login");
    }
  }


  getEmail = email => {
    this.setState({theEmail:email});
  }

  render() {
      //This is a call to config properties .env file in root folder project
      require('dotenv').config();
    
      const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      getEmail: this.getEmail,
      theEmail:this.state.theEmail
      };

    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Limonnana</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
            {this.state.isAuthenticated ? (
            <Fragment>
            <LinkContainer to="/users">
            <NavItem>Users</NavItem>
            </LinkContainer>

            <LinkContainer to="/setDate">
            <NavItem>Set Date</NavItem>
            </LinkContainer>

            <NavItem onClick={this.handleLogout}>Logout</NavItem>
            </Fragment>
          
          
          ) : (
            <Fragment>
            <LinkContainer to="/signup">
            <NavItem>Signup</NavItem>
            </LinkContainer>
           <LinkContainer to="/login">
           <NavItem>Login</NavItem>
           </LinkContainer>
           </Fragment>
            )
}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default withRouter(App);
