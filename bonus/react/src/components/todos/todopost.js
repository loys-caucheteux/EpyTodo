import React from 'react'
import Axios from 'axios'

const Todos = ({ todos }) => {
    return (
      <div>
          <div className="row bg-dark border-3 card">
            <div className="col-md-11">
            <h4>{todos.msg}</h4>
            {todos.map(todo => (
                <div>
                    <h4>Todo number {todo.id} : {todo.title} currently {todo.status}</h4>
                    <h5>{todo.description}</h5>
                    <h6>Posted since : {todo.created_at}</h6>
                    <h6>Due for : {todo.due_time}</h6>
                    <h6>User number {todo.user_id}</h6>
                </div>
                ))}
            </div>
          </div>
      </div>
    )
  };  

class TodoForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {todo: [], title: '', description: '', due_time: '', user_id: '', status: ''}
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChTitle = this.handleChTitle.bind(this);
      this.handleChDesc = this.handleChDesc.bind(this);
      this.handleChDueTime = this.handleChDueTime.bind(this);
      this.handleChUid = this.handleChDueTime.bind(this);
      this.handleChStatus = this.handleChStatus.bind(this);
    }
    getData() {
        Axios.post(String('http://localhost:8080/todo'),
        {title: this.state.title,
            description: this.state.description,
            due_time: this.state.due_time,
            user_id: this.state.user_id,
            status: this.state.status},
        {headers: {'token': this.props.token}})
        .then((response) => {
            this.setState({todo: response.data})
        });
    }
    handleChTitle(event) {
        this.setState({title: event.target.value})
    }
    handleChDesc(event) {
        this.setState({description: event.target.value})
    }
    handleChDueTime(event) {
        this.setState({due_time: event.target.value})
    }
    handleChUid(event) {
        this.setState({user_id: event.target.value})
    }
    handleChStatus(event) {
        this.setState({status: event.target.value})
    }
    handleSubmit(event) {
      this.getData()
      event.preventDefault();
    }
  
    render() {
      return (
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="d-grid gap">
              <input className="form-control" type="text" value={this.state.title} placeholder="email" onChange={this.handleChangeE} />
              <input className="form-control" type="password" value={this.state.description} placeholder="password" onChange={this.handleChangeP} />
              <input className="form-control" type="text" value={this.state.due_time} placeholder="First Name" onChange={this.handleChangeF} />
              <input className="form-control" type="text" value={this.state.user_id} placeholder="Last Name" onChange={this.handleChangeL} />
              <label for="status">Status</label>
              <select name="status" id="status">
                <option value="not started">not started</option>
                <option value="todo">todo</option>
                <option value="in progress">in progress</option>
                <option value="done">done</option>
              </select>
              <input className="btn btn-outline-success" type="submit" value="Send"/>
            </div>
          </form>
          <div className="row bg-dark border-3 card">
              <Todos  todos={this.state.todo}/>
          </div>
        </div>
      );
    }
  }

export default TodoForm