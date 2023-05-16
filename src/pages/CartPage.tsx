import Navbar from "../component/Navbar";
import Checkout from "../component/Checkout";
import FooterLanding from "../component/FooterLanding";
import { useEffect } from "react";
import MiniGridCards from "../component/MiniGridCards";

const CartPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <Checkout />
      <MiniGridCards />
      <FooterLanding />
    </>
  );
};

export default CartPage;
