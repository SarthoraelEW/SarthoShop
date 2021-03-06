import React, { useEffect, useState } from "react";
import { isEmpty } from "../Utils";

const QuantityButton = ({ onChange, preQuantity, mustBeSupThanOne }) => {
  const [quantity, setQuantity] = useState(isEmpty(preQuantity) ? 1 : preQuantity);

  const incQuantity = () => {
    onChange(quantity + 1);
    setQuantity(quantity + 1);
  };

  const decQuantity = () => {
    if (quantity === 1 && !mustBeSupThanOne) {
      onChange(quantity - 1);
    }
    else if (quantity > 1) {
      onChange(quantity - 1);
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    setQuantity(preQuantity);
  }, [preQuantity])

  return (
    <div className="quantity-button">
      <label>QUANTITÉ</label>
      <div className="buttons">
        <span class="material-icons-outlined" onClick={decQuantity}>
          remove
        </span>
        <input
          type="text"
          name="quantity"
          id="quantity"
          onChange={(e) => {
            setQuantity(e.target.value);
            onChange(e.target.value);
          }}
          value={quantity}
        />
        <span class="material-icons-outlined" onClick={incQuantity}>
          add
        </span>
      </div>
    </div>
  );
};

export default QuantityButton;
