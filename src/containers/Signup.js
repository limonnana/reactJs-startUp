import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Signup.css";
import axios from 'axios';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isLoading: false,
      name:"",
      lastName:"",
      phone:"",
      email: "",
      password: "",
      confirmPassword: "",
      errorEmail: "",
      errorPassword: ""
      
    };
  }

  validatePassword(){
    let toReturn = false;
    let password = this.state.password;
    let result = "";
    var reg = new RegExp("^(?=.*?[a-z])(?=.*?[0-9]).{7,22}$");
    var test = reg.test(password);
    if(test){
      console.log('password is valid');
      toReturn = true;
   }else{
     console.log('fail, password is invalid');
     result = "Password is not valid";
     toReturn = false;
   }        
   this.setState({errorPassword:result}); 
   return toReturn;
  }

  validateEmail(){
   let email = this.state.email;
   let result = "";
   let toReturn = false;
   let emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
   if(emailValid){
    console.log('email is valid');
    toReturn = true;
  }else{
   console.log('emailValid is invalid');
   result = " Email is not valid";
   toReturn = false;
  }   
  this.setState({errorEmail:result});    
  return toReturn;
  }

  validateFields(){
    if(this.validatePassword() && this.validateEmail()){
      return true;
    }else{
      return false;
    }
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.phone.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }


  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    if(this.validateFields()){

    this.setState({ isLoading: true });
    var domain =  process.env.REACT_APP_DOMAIN;
    axios.post(domain + '/signup', 
        {
          name: this.state.name, lastName: this.state.lastName ,email:this.state.email, phone:this.state.phone, password: this.state.password
        })
        .then((response)=> {
            console.log(" this is the response: " + response.data);
            
            if(response.data === 'Success'){
              this.props.history.push("/login");
            }
        })
        .catch(function (response) {
            //this.setState({ isLoading: false });
            console.log(response);
        });
      }
    this.setState({ isLoading: false });
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
       
        <FormGroup controlId="name" bsSize="large">
          <ControlLabel>Name</ControlLabel>
          <FormControl
           autoFocus
            value={this.state.name}
            onChange={this.handleChange}
            type="text"
          />
        </FormGroup>
        <FormGroup controlId="lastName" bsSize="large">
          <ControlLabel>Last Name</ControlLabel>
          <FormControl
            value={this.state.lastName}
            onChange={this.handleChange}
            type="text"
          />
        </FormGroup>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          </FormGroup>
        <span style={{color:"red"}}>{this.state.errorEmail}</span>
        <FormGroup controlId="phone" bsSize="large">
          <ControlLabel>Phone</ControlLabel>
          <FormControl
            value={this.state.phone}
            onChange={this.handleChange}
            type="text"
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
        <span style={{color:'red'}}>{this.state.errorPassword}</span>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            value={this.state.confirmPassword}
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
          text="Signup"
          loadingText="Signing up…"
        />
      </form>
    );
  }

  
}