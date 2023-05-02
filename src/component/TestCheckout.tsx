//TestCheckout.tsx
const TestCheckout = () => {
  const handleCheckout = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: 1,
          }),
        }
      );
      const data = await response.json();
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
