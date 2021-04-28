import React from 'react'
import Axios from 'axios'

class RegisterForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
        firstname: '',
        name: '',
        token: [],
        msg: ''
      }
      this.handleChangeP = this.handleChangeP.bind(this);
      this.handleChangeE = this.handleChangeE.bind(this);
      this.handleChangeL = this.handleChangeL.bind(this);
      this.handleChangeF = this.handleChangeF.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    getData() {
      Axios.post('http://localhost:8080/register', { email: this.state.email, password: this.state.password, firstname: this.state.firstname, name: this.state.name }).then((response) => {
        this.setState({token: response.data.token, msg: response.data.msg})
      });
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
  
    handleSubmit(event) {
      this.getData()
      event.preventDefault();
    }
  
    render() {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
          <div className="d-grid gap">
              <input className="form-control" type="text" value={this.state.email} placeholder="email" onChange={this.handleChangeE} />
              <input className="form-control" type="password" value={this.state.password} placeholder="password" onChange={this.handleChangeP} />
              <input className="form-control" type="text" value={this.state.firstname} placeholder="First Name" onChange={this.handleChangeF} />
              <input className="form-control" type="text" value={this.state.name} placeholder="Last Name" onChange={this.handleChangeL} />
              <input className="btn btn-outline-success" type="submit" value="Send"/>
            </div>
          </form>
          <div className="row bg-dark border-3 card">
            <span className="bg-dark col-md-11">{this.state.msg}</span>
            <span className="bg-dark col-md-11" style={{fontSize: "smaller"}}>token : {this.state.token}</span>
          </div>
        </div>
      );
    }
  }

export default RegisterForm;