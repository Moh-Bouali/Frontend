import React from "react";
import "./CartItem.css";
function CartItem({ menuId, name, price, qty, type, updateQty }) {
  const addOne = () => {
    updateQty(menuId, qty + 1)
  }
  const subtractOne = () => updateQty(menuId, qty - 1);
  return (
    <div className="CartItem">
      <div id="CartType"><h1>{type}</h1></div>
      <div>{name}</div>
      <div>€{price}</div>
      <div>
        <button onClick={subtractOne} disabled={qty <= 0}>
          -
        </button>
        {qty}
        <button onClick={addOne}>+</button>
      </div>
      <div>Total: €{qty * price}</div>
    </div>
  );
}
export default CartItem;