import React, {useEffect, useState } from "react";
import "./payment.css";
import { useStateValue } from "../../StateProvider";
import CheckoutProducts from "./CheckoutProducts";
import { Link} from "react-router-dom";
import { getBasketTotal } from "../../reducer";
import CurrencyFormat from "react-currency-format";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from '../../axios';
import { db } from "../../firebase";

function Payment() {
  const [{ user, basket }] = useStateValue();
  const total = getBasketTotal(basket);
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false)
  const [processing, setProcessing] = useState("") 
  const [clientSecret, setClientSecret] = useState(true)

  useEffect(() => {
      const getClientSecret = async () => {
          const response = await axios({
              method:'post',
              url: `/payments/create?total=${total * 100}`
      });
      setClientSecret(response.data.clientSecret)
    }
    getClientSecret();
  }, [total])
  const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        //const payload = await stripe
  };
  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };
  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout(
          <Link to="/basket">{basket?.length} items</Link>)
        </h1>
        <div className="payment-section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{!user ? "Guest" : user.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>
        <div className="payment-section">
          <div className="payment_title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment_items">
            {basket.map((item) => (
              <CheckoutProducts
                id={item.id}
                price={item.price}
                title={item.title}
                rating={item.rating}
                image={item.image}
              />
            ))}
          </div>
        </div>
        <div className="payment-section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment_priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>
                        Order Total:  {`${value}`}
                      </h3>
        
                    </>
                  )}
                  decimalScale={2}
                  value={total}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                    <span>{processing ? <p>Processing</p>:
                    "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
