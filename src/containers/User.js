import React, { Component } from "react";
import {
    FormGroup,
    FormControl,
    ControlLabel
  } from "react-bootstrap";
  import LoaderButton from "../components/LoaderButton";
import "./User.css";
import axios from 'axios';

export default class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isDeleting:false,
      id:"",
      name:"",
      lastName:"",
      phone:"",
      email: "",
      domain: process.env.REACT_APP_DOMAIN
    };
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.phone.length > 0 
    );
  }


  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  
  handleDelete = async event => {
    event.preventDefault();
  
    const confirmed = window.confirm(
      "Are you sure you want to delete this user ?"
    );
  
    if (!confirmed) {
      return;
    }else{
     this.deleteUser();
     }
  }

  handleSubmit = async event => {
    event.preventDefault();
   
    this.setState({ isLoading: true });
   
    axios.post(this.state.domain + '/updateUser', 
        {
          id:this.state.id, name: this.state.name, lastName: this.state.lastName ,email:this.state.email, phone:this.state.phone
        })
        .then((response)=> {
            console.log(" this is the response: " + response.data);
            
            if(response.data === 'Success'){
              this.props.history.push("/users");
            }
        })
        .catch(function (response) {
            //this.setState({ isLoading: false });
            console.log(response);
        });

    this.setState({ isLoading: false });
  }

  async componentDidMount() {
    try {
     
       this.getUser();
      
    } catch (e) {
      alert(e);
    }
  }

  deleteUser(){
    this.setState({ isDeleting: true });
    const url = this.state.domain + "/deleteUser/" + this.props.match.params.id;
      axios.get(url).then(res => {
        this.setState({ isDeleting: false });
        this.props.history.push("/users");
      })
    }

  getUser() {
      const url = this.state.domain + "/user/" + this.props.match.params.id;
      axios.get(url).then(res => {
        
        const id = res.data.id;
        const name = res.data.name;
        const lastName = res.data.lastName;
        const phone = res.data.phone;
        const email = res.data.email;
        this.setState({id, name , lastName, phone, email });
        
    })
  }

  render() {
   
    return (
        <form onSubmit={this.handleSubmit}>
           <FormGroup controlId="id" >
          <FormControl 
              value={this.state.id}
               type="hidden"
            /> 
          </FormGroup>
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
          <FormGroup controlId="phone" bsSize="large">
            <ControlLabel>Phone</ControlLabel>
            <FormControl
              value={this.state.phone}
              onChange={this.handleChange}
              type="text"
            />
          </FormGroup>
         
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Update"
            loadingText="Updating user…"
          />
          <br/>
          <LoaderButton
            block
            bsStyle="danger"
            bsSize="large"
            isLoading={this.state.isDeleting}
            onClick={this.handleDelete}
            text="Delete"
            loadingText="Deleting…"
          />
           
        </form>
      );
    }
  
}
