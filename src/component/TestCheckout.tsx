//TestCheckout.tsx

import { useState, useEffect } from "react";

type pendingOrdersType = {
  price: string;
  quantity: number;
};

const TestCheckout = () => {
  const [pendingOrders, setPendingOrders] = useState<pendingOrdersType[]>([
    {
      price: "price_1N2xpLIundI4kMC0oOM2FbXl",
      quantity: 2,
    },
  ]);

  const handleCheckout = async () => {
    try {
      console.log(pendingOrders);
      const line_items = pendingOrders;

      const response = await fetch(
        "https://donutk-backend-pifrn.ondigitalocean.app/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            line_items,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      window.location = data.url;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>TestCheckout</h1>
      <button onClick={() => handleCheckout()}>go to stripe</button>
    </div>
  );
};

export default TestCheckout;
