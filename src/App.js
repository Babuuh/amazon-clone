import React , {useEffect} from 'react';
import Header from "./components/header/Header";
import Homepage from "./components/home/Homepage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./components/checkout/Checkout";
import Login from "./components/login/Login.jsx";
import { auth } from './firebase';
import { useStateValue } from './StateProvider';

function App() {

  const [{}, dispatch] = useStateValue()
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('User: ', authUser);

      if(authUser){
        dispatch({
          type: "SET_USER",
          user: authUser
        })

      }else{
        dispatch({
          type: "SET_USER",
          user: null
        })

      }
    })
  }, [])
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
          <Header />
            <Checkout />
          </Route>
          <Route path="/">
          <Header />
            <Homepage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
