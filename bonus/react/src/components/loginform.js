import React from 'react'
import Axios from 'axios'

class LoginForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
        token: []
      }
      this.handleChangeP = this.handleChangeP.bind(this);
      this.handleChangeE = this.handleChangeE.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    getData() {
      Axios.post('http://localhost:8080/login', { email: this.state.email, password: this.state.password }).then((response) => {
        this.setState({token: response.data.token})
    });
    }
    handleChangeE(event) {
      this.setState({email: event.target.value})
    }
    handleChangeP(event) {
      this.setState({password: event.target.value})
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
                <input className="btn btn-outline-success" type="submit" value="Send"/>
            </div>
          </form>
          <div className="row border-3 bg-dark card">
            <span className="bg-dark col-md-11" style={{fontSize: "smaller"}}>token : {this.state.token}</span>
          </div>
        </div>
      );
    }
  }

export default LoginForm;