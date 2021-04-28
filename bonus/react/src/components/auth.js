import React from 'react'
import LoginForm from './loginform'
import RegisterForm from './registerform'

class Auth extends React.Component {
  render() {
    return (
        <div className="d-grid gap top-0 start-0 mt-2 col-md-3">
          <button className="btn row button blue" type="button" data-bs-toggle="collapse" data-bs-target="#form_login" aria-controls="form_login" aria-expanded="false" aria-label="Toggle LoginPOST">
              <i className="col-md-2" data-feather="lock"></i>Login : POST /login
          </button>
          <div className="collapse" id="form_login">
            <LoginForm />
          </div>

          <button className="btn row button light_blue" type="button" data-bs-toggle="collapse" data-bs-target="#form_register" aria-controls="form_register" aria-expanded="false" aria-label="Toggle RegisterPOST">
            <i className="col-md-2" data-feather="check-circle"></i>Register : POST /register
          </button>
          <div className="collapse" id="form_register">
            <RegisterForm />
          </div>
        </div>
    );
  }
}

export default Auth;