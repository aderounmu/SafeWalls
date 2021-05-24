import logo from './logo.svg';
import './App.css';
import AuthPage from './pages/AuthPage.js'
import MapPage from './pages/MapPage.js'
import NoPage from './pages/NoPage.js'
import AddCrimeForm from './components/AddCrimeForm.js'
import crimeFilter from './components/crimeFilter'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

//require('dotenv').config()

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

function App() { 
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/auth">
            <AuthPage />
          </Route>
          <Route exact path="/">
            <MapPage />
          </Route>
           <Route exact path="/test">
            <LoginForm />
          </Route>
          <Route exact path="*">
            <NoPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
