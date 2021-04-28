import React from 'react'

class TokenForm extends React.Component {
    constructor(props) {
      super(props);
      this.url = `todo?token=${this.props.token}`;
      this.getUrl = this.getUrl.bind(this);
      this.getUrlUser = this.getUrlUser.bind(this);
    }
    getUrl() {return `todo?token=${this.props.token}`}
    getUrlUser() {return `http://localhost:3000?token=${this.props.token}`}
    render() {
      return (
        <div className="position-absolute start-50 top-0">
        <input className="form-control" type="text" value={this.props.token} placeholder="token" onChange={this.props.handleToken}/>
        <a href={this.getUrl()}>Todos commands</a><br />
        <a href={this.getUrlUser()}>Users commands</a>

        </div>
      );
    }
  }

export default TokenForm;