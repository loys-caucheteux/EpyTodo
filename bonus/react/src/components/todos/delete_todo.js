import React from 'react'
import Axios from 'axios'

const Msg = ({ msg }) => {
    return (
      <div>
          <div className="row bg-dark border-3 card">
            <div className="col-md-11">
              <h4>Msg : {msg}</h4>
            </div>
          </div>
      </div>
    )};

class DeleteTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      msg: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  getData(id) {
    Axios.delete(String(`http://localhost:8080/user/${id}`), {headers: {'token': this.props.token}}).then(response => {
        this.setState({msg: response.data})
    });
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.getData(this.state.value)
    event.preventDefault();
  }

  render() {
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
        <Msg contact={this.state.msg}/>
    </div>
      );
    }
}

export default DeleteTodo