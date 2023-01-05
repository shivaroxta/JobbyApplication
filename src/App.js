import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import './App.css'
import Jobs from './components/Jobs'
// eslint-disable-next-line

// eslint-disable-next-line

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/" component={Home} />
    <Route exact path="/jobs" component={Jobs} />
  </Switch>
)
export default App
