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

class UserTodoGET extends React.Component {
    constructor(props) {
      super(props);
      this.state = {todos: []}
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    getData() {
        if (this.props.quest === "USER") {
            Axios.get(String('http://localhost:8080/user/todos'), {headers: {'token': this.props.token}}).then((response) => {
                this.setState({todos: response.data})
            });
        }
        else if (this.props.quest === "TODOS") {
            Axios.get(String('http://localhost:8080/todo'), {headers: {'token': this.props.token}}).then((response) => {
                this.setState({todos: response.data})
            });
        }
    }
    handleSubmit(event) {
      this.getData()
      event.preventDefault();
    }
  
    render() {
      return (
        <div className="container">
            <button className="btn btn-outline-success col-md-12" onClick={this.handleSubmit}>Send</button>
          <Todos todos={this.state.todos} />
        </div>
      );
    }
  }

export default UserTodoGET