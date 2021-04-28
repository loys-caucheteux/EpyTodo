import Menu from './components/app'
import Todo from './components/todos/todo'
import './index.css';
import Auth from './components/auth'
import './bootstrap/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
// import Header from './components/header'
// import Footer from './components/footer'

ReactDOM.render((
  <main>
    <Auth />
    <Router>
      <Switch>
        <Route exact path="/" component={Menu} />
        <Route exact path="/todo" component={Todo} />
      </Switch>
    </Router>
  </main>
),document.getElementById('root'));

// Now the app has started!