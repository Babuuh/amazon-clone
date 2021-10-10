import React from "react";
import { useStateValue } from "../../StateProvider";
import "./checkout.css";
import CheckoutProducts from "./CheckoutProducts";
import Subtotal from "./Subtotal";

function Checkout() {
  const [{ basket, user }] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout_left">
        <img
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
          className="checkout_ad"
        />
        <div>
        <h4>Hello, {user? user.email:'Guest'}</h4>
          <h2 className="checkout__title">Your shopping Basket</h2>

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
      <div className="checkout_right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
