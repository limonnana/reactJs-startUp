import React, { Component } from "react";
import "./Users.css";
import axios from 'axios';
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";

export default class Users extends Component {

    constructor(props) {
        super(props);
        this.renderUserList = this.renderUserList.bind(this);
        this.state = {
          isLoading: true,
          users: []
        };
      }

      async componentDidMount() {
       
        try {
            
            var domain =  process.env.REACT_APP_DOMAIN;
            axios.get(domain + '/userList')
            .then(res => {
               const users = res.data;
               console.log(users);
               this.setState({ users });
            })
        } catch (e) {
          alert(e);
        }
      
        this.setState({ isLoading: false });
      }
      
    
      renderUserList() {
        return this.state.users.map(
            user =>
             
                 <ListGroupItem
                    key={user.id}
                    href={`/user/${user.id}`}
                    onClick={this.handleuserClick}
                    header={user.email}
                  >
                  {user.id}  {user.name} {user.lastName}  {user.phone}
                  </ListGroupItem>
        )}
        
        handleuserClick = event => {
            event.preventDefault();
            this.props.history.push(event.currentTarget.getAttribute("href"));
          }

      renderUsers() {
        return (
          <div className="Users">
            <PageHeader>Users</PageHeader>
            <ListGroup>
              {!this.state.isLoading && this.renderUserList()}
            </ListGroup>
          </div>
        );
      }

      render() {
        return (
          <div className="Users">
           {this.renderUsers()}
          </div>
        );
      }
}