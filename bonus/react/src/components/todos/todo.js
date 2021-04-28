import React from 'react';
import '../../index.css';
import '../../bootstrap/css/bootstrap.min.css';
import DeleteTodo from './delete_todo'
import TodoForm from './todopost'
import TodoPut from './todoput'
import UserTodoGET from './usertodos'
import TokenForm from '../token'

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {token: ''};
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({token: event.target.value});
  }
  render() {
    return (
      <div className="container">
        <TokenForm token={this.state.token} handleToken={this.handleChange}/>
        <div className="d-grid gap top-50 translate-middle position-absolute start-50 col-md-4">
        <button className="btn row button blue" type="button" data-bs-toggle="collapse" data-bs-target="#user_todo" aria-controls="user_todo" aria-expanded="false" aria-label="Toggle UserTodo">
            <i className="col-md-2" data-feather="check"></i>GET /user/todos
          </button>
          <div className="collapse" id="user_todo">
            <UserTodoGET quest = 'USER' token = {this.state.token}/>
          </div>

          <button className="btn row button blue" type="button" data-bs-toggle="collapse" data-bs-target="#todoGET" aria-controls="todoGET" aria-expanded="false" aria-label="Toggle todoGET">
            <i className="col-md-2" data-feather="list"></i>GET /todo
          </button>
          <div className="collapse" id="todoGET">
            <UserTodoGET quest = 'TODOS' token = {this.state.token}/>
        </div>
          <button className="btn row button yellow" type="button" data-bs-toggle="collapse" data-bs-target="#getuser" aria-controls="getuser" aria-expanded="false" aria-label="Toggle UserGET noid">
            <i className="col-md-2" data-feather="user"></i> POST /todo
          </button>
          <div className="collapse" id="getuser">
            <TodoForm token = {this.state.token}/>
          </div>

          <button className="btn row button green" type="button" data-bs-toggle="collapse" data-bs-target="#form_getuser" aria-controls="form_getuser" aria-expanded="false" aria-label="Toggle UserGET">
            <i className="col-md-2" data-feather="users"></i>PUT /todo
          </button>
          <div className="collapse" id="form_getuser">
            <TodoPut quest = 'GET' token = {this.state.token}/>
          </div>

          <button className="btn row button blue" type="button" data-bs-toggle="collapse" data-bs-target="#put_user" aria-controls="put_user" aria-expanded="false" aria-label="Toggle UserPUT">
            <i className="col-md-2" data-feather="user-check"></i>DELETE /todo
          </button>
          <div className="collapse" id="put_user">
            <DeleteTodo token = {this.state.token}/>
          </div>
        </div>
      </div>
    )
  }
};

export default Todo