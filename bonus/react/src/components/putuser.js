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

class UserPUT extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        id: '',
        email: '',
        password: '',
        firstname: '',
        name: '',
        created_at: '',
        data: [],
        msg: ''
      }
      this.handleChangeP = this.handleChangeP.bind(this);
      this.handleChangeE = this.handleChangeE.bind(this);
      this.handleChangeL = this.handleChangeL.bind(this);
      this.handleChangeF = this.handleChangeF.bind(this);
      this.handleChangeD = this.handleChangeD.bind(this);
      this.handleChangeI = this.handleChangeI.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    getData() {
      Axios.post(`http://localhost:8080/user/${this.state.id}`, { email: this.state.email, password: this.state.password, firstname: this.state.firstname, name: this.state.name, created_at: this.state.created_at }).then((response) => {
        this.setState({data: response.data})
      });
    }
    handleChangeI(event) {
        this.setState({id: event.target.value});
      }
    handleChangeE(event) {
      this.setState({email: event.target.value});
    }
    handleChangeF(event) {
        this.setState({firstname: event.target.value});
    }
    handleChangeL(event) {
        this.setState({name: event.target.value});
    }
    handleChangeP(event) {
        this.setState({password: event.target.value});
    }
    handleChangeD(event) {
        this.setState({created_at: event.target.value});
      }
    handleSubmit(event) {
      this.getData()
      event.preventDefault();
    }
  
    render() {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
          <div className="d-grid gap">
              <input className="form-control" type="text" value={this.state.id} placeholder="User ID" onChange={this.handleChangeI} />
              <input className="form-control" type="text" value={this.state.email} placeholder="email" onChange={this.handleChangeE} />
              <input className="form-control" type="password" value={this.state.password} placeholder="password" onChange={this.handleChangeP} />
              <input className="form-control" type="text" value={this.state.firstname} placeholder="First Name" onChange={this.handleChangeF} />
              <input className="form-control" type="text" value={this.state.name} placeholder="Last Name" onChange={this.handleChangeL} />
              <input className="btn btn-outline-success" type="submit" value="Send"/>
            </div>
          </form>
          <div className="row bg-dark border-3 card">
            <Users contact={this.state.data} />
          </div>
        </div>
      );
    }
  }

export default UserPUT;