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
    )};

class UserGETform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      users: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  getData(id) {
    if (this.props.quest === 'GET') {
      Axios.get(String(`http://localhost:8080/user/${id}`), {headers: {'token': this.props.token}}).then((response) => {
          this.setState({users: response.data})
      });
    }
    else if (this.props.quest === 'DELETE') {
      Axios.delete(String(`http://localhost:8080/user/${id}`), {headers: {'token': this.props.token}}).then((response) => {
          this.setState({users: response.data})
      });
    }
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.getData(this.state.value)
    event.preventDefault();
  }

  render() {
    if (this.props.quest === 'GET') {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="container">
            <label className="col-md-10">
              <input className="form-control" type="text" placeholder="User ID or Email" value={this.state.value} onChange={this.handleChange} />
            </label>
              <input className="btn btn-outline-success" type="submit" value="Send" />
            </div>
          </form>
          <Users contact={this.state.users} />
        </div>
      );
    }
    else if (this.props.quest === 'DELETE') {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="container">
            <label className="col-md-10">
              <input className="form-control" type="text" placeholder="User ID" value={this.state.value} onChange={this.handleChange} />
            </label>
              <input className="btn btn-outline-success" type="submit" value="Send" />
            </div>
          </form>
          <Users contact={this.state.users} quest={this.props.quest} />
        </div>
      );
    }

  }
}

export default UserGETform