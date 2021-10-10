import React, { useEffect } from "react";
import Header from "./components/header/Header";
import Homepage from "./components/home/Homepage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./components/checkout/Checkout";
import Login from "./components/login/Login.jsx";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./components/checkout/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51IQR3cFIES1DEooYXn5OsjJ1xfxkgODvc8ugOb9nPP3rcCOwsMBNwEy0YlgfKCGeAthmSURXwjY7Qvx4BJSi7LXO00Q8tfNbpe"
);

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("User: ", authUser);

      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/basket">
            <Header />
            <Checkout />
          </Route>
          <Route path="/checkout">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
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
