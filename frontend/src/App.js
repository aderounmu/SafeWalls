import logo from './logo.svg';
import './App.css';
import AuthPage from './pages/AuthPage.js'
import MapPage from './pages/MapPage.js'
import NoPage from './pages/NoPage.js'
<<<<<<< HEAD
import '@progress/kendo-theme-default/dist/all.css';
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import { Button } from '@progress/kendo-react-buttons';
=======
import AddCrimeForm from './components/AddCrimeForm.js'


>>>>>>> 198c80f2dba886f856582332b39f2f775631fc2f

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
            <AddCrimeForm />
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
