import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import Cookies from 'universal-cookie';
import "./Login.css";
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.autenticate = this.autenticate.bind(this);
   
    this.state = {
      isLoading: false,
      email: "",
      password: ""
    };
    
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  autenticate(dataResponse){
    this.props.userHasAuthenticated(true);
    this.props.getEmail(this.state.email);
    const cookie = new Cookies();
    const value = {"userId":dataResponse.userId,"token":dataResponse.token};
    cookie.set('limonnana', value, { path: '/',maxAge: 3600});
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
     
      event.preventDefault();
       
      this.setState({ isLoading: true });
      var emailS= this.state.email;
      var passwordS = this.state.password;
      
      if(emailS != null &&  passwordS != null){
      
        const domain =  process.env.REACT_APP_DOMAIN;
      
      axios.post(domain + '/login', 
        {
          username: emailS, password: passwordS
        })
        .then((response)=> {
            console.log(" this is the response: " + response.data.response);
            
            if(response.data.response === 'Success'){
              var dataResponse = {token: response.data.token, userId: response.data.userId };
              this.autenticate(dataResponse);
              this.props.history.push("/");
            }
        })
        .catch(function (response) {
           // this.setState({isLoading:false} );
            console.log(response);
        });
      }
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Logging in…"
          />
        </form>
      </div>
    );
  }
}