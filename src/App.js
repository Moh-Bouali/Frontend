import React, {useState} from 'react';
import './App.css';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import MainPage from './components/MainPage/MainPage';
import RestaurantMenu from './components/RestaurantMenu/RestaurantMenu';
import OrderStatus from './components/OrderStatus/OrderStatus';
function App() {

  const [title, updateTitle] = useState(null);

  return (
    <Router>
    <div className="App">
      <Header title={title}/>
        <div className="container d-flex align-items-center flex-column">
          <Switch>
            <Route path="/" exact={true}>
              <LoginForm updateTitle={updateTitle}/>
            </Route>
            <Route path="/register">
              <RegistrationForm updateTitle={updateTitle}/>
            </Route>
            <Route path="/mainpage" >
              <MainPage updateTitle={updateTitle} />
            </Route>
            <Route path="/restaurantMenu/:id" component={RestaurantMenu}>
              <RestaurantMenu updateTitle={updateTitle} />
            </Route>
            <Route path="/orderStatus/">
              <OrderStatus updateTitle={updateTitle} />
            </Route>
          </Switch>
        </div>
    </div>
    </Router>
  );
}
export default App;