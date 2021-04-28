import React from 'react'
import Axios from 'axios'

const Users = ({ contact }) => {
    return (
      <div>
          <div className="row bg-dark border-3 card">
            <div className="col-md-11">
              <h4>{contact.msg}</h4>
              <h4>{contact.firstname} {contact.name}</h4>
              <h5>{contact.email}</h5><br/>
              <h6>Hashed Password : {contact.password}</h6>
              <h6>Member since : {contact.created_at}</h6>
            </div>
          </div>
      </div>
    )
  };  

class UserGET extends React.Component {
    constructor(props) {
      super(props);
      this.state = {user: []}
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    getData() {
      Axios.get(String('http://localhost:8080/user'), {headers: {'token': this.props.token}}).then((response) => {
          this.setState({user: response.data})
      });
    }
    handleSubmit(event) {
      this.getData()
      event.preventDefault();
    }
  
    render() {
      return (
        <div className="container">
            <button className="btn btn-outline-success col-md-12" onClick={this.handleSubmit}>Send</button>
          <Users contact={this.state.user} />
        </div>
      );
    }
  }

export default UserGET