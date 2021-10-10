import React from "react";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../../reducer";
import { useStateValue } from "../../StateProvider";
import './subtotal.css';
import {useHistory,Link} from 'react-router-dom';

function Subtotal() {
  const history = useHistory();
  const [{ basket}] = useStateValue ();
  const total = getBasketTotal(basket)
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items):
              <strong>{`${value}`}</strong>
            </p>
            <small className="subtotal_gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={total}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button onClick={e => history.push('/checkout')}>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
