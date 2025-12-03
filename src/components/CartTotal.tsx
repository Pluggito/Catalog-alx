import { useMemo } from "react";
import { useSelector } from "react-redux";
import Title from "./Title";
import type { Product } from "../types/product";

const CartTotal = () => {
  // Read cart from Redux: cart items have quantity in cartSlice
  const cart: (Product & { quantity: number })[] = useSelector((state: any) => state.cart.cart ?? []);

  // currency and delivery fee can be configured via env, fallback values provided
   const currency = "₦";
  const delivery_fee = 6000;

  // subtotal (sum of price * quantity)
  const cartAmount = useMemo(() => {
    return cart.reduce((sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1), 0);
  }, [cart]);

  const totalAmount = cartAmount === 0 ? 0 : cartAmount + delivery_fee;

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART "} text2={"TOTAL"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>SubTotal</p>
          <p>
            {currency} {cartAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Delivery Fee</p>
          <p>
            {currency} {delivery_fee.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency} {totalAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
