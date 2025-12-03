import { useDispatch, useSelector } from "react-redux";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { removeFromCart, increaseQty, decreaseQty } from "../redux/cartSlice";
import type { Product } from "../types/product";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // cart items already stored with quantity in cartSlice
  const cart: (Product & { quantity: number })[] = useSelector((state: any) => state.cart.cart ?? []);
  const products: Product[] = useSelector((state: any) => state.products.items ?? []);

  // show loading if products not yet available
  if (!Array.isArray(products) || products.length === 0) {
    return <div className="p-10 text-center">Loading your cart…</div>;
  }

  const handleDelete = (id: number) => {
    dispatch(removeFromCart(id));
    // minimal feedback
    // you can replace with toast if you have a toast library
    console.log("Item removed from cart:", id);
  };

  const handleQuantityChange = (id: number, newQty: number) => {
    const item = cart.find((c) => c.id === id);
    if (!item) return;

    if (newQty <= 0) {
      dispatch(removeFromCart(id));
      return;
    }

    const diff = newQty - item.quantity;
    if (diff > 0) {
      for (let i = 0; i < diff; i++) dispatch(increaseQty(id));
    } else if (diff < 0) {
      for (let i = 0; i < Math.abs(diff); i++) dispatch(decreaseQty(id));
    }
  };

  const cartIsEmpty = cart.length === 0;

  return (
    <div className="border-t pt-8 px-4">
      <div className="text-2xl mb-4">
        <Title text1={"YOUR "} text2={"CART"} />
      </div>

      {cartIsEmpty ? (
        <div className="p-10 text-center text-gray-600">Your cart is empty.</div>
      ) : (
        <>
          <div className="mb-6">
            {cart.map((item) => {
              // item contains product fields already
              const productData = products.find((p) => p.id === item.id) ?? item;
              return (
                <div
                  key={item.id}
                  className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.6fr_0.6fr] sm:grid-cols-[4fr_1fr_0.5fr] items-center gap-4"
                >
                  <div className="flex items-start gap-4">
                    <img className="w-16 sm:w-20 object-cover" src={productData.image} alt={productData.name} />
                    <div>
                      <p className="text-sm sm:text-lg font-medium">{productData.name}</p>
                      <div className="flex items-center gap-5 mt-2 text-sm">
                        <p>
                          ₦{Number(productData.price).toLocaleString("en-NG", { maximumFractionDigits: 0 })}
                        </p>
                      </div>
                      {productData.description && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{productData.description}</p>
                      )}
                    </div>
                  </div>

                  <input
                    className="border max-w-[70px] px-2 py-1"
                    type="number"
                    min={0}
                    value={item.quantity}
                    aria-label={`Quantity for ${productData.name}`}
                    title={`Quantity for ${productData.name}`}
                    placeholder="0"
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (Number.isNaN(val)) return;
                      handleQuantityChange(item.id, val);
                    }}
                  />

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-800 flex items-center justify-center"
                    aria-label={`Remove ${productData.name}`}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end my-8">
            <div className="w-full sm:w-[420px]">
              <CartTotal />
              <div className="w-full text-end">
                <button
                  className="bg-black text-white text-sm my-6 px-6 py-3"
                  onClick={() => navigate("/placeorder")}
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;