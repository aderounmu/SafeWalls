import logo from './logo.svg';
import './App.css';
import AuthPage from './pages/AuthPage.js'
import MapPage from './pages/MapPage.js'
import NoPage from './pages/NoPage.js'
import AddCrimeForm from './components/AddCrimeForm.js'
import CrimeFilter from './components/CrimeFilter.js'
import {AuthProvider} from './context/AuthContext.js'
import {LocationProvider} from './context/LocationContext.js'
import {FilterDataProvider} from './context/FilterDataContext.js'
import {CrimeDataProvider} from './context/CrimeDataContext.js'
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
      <AuthProvider>
      <LocationProvider>
      <FilterDataProvider>
      <CrimeDataProvider>
      <div className="App">
        <Switch>
          <Route path="/auth">
            <AuthPage />
          </Route>
          <Route exact path="/">
            <MapPage />
          </Route>
           <Route exact path="/test">
            <CrimeFilter />
          </Route>
          <Route exact path="*">
            <NoPage />
          </Route>
        </Switch>
      </div>
      </CrimeDataProvider>
      </FilterDataProvider>
      </LocationProvider>
      </AuthProvider>
    </Router>

  );
}

export default App;
