import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cartItems = [], removeFromCart, updateQuantity } = useCart();

  const subtotal = cartItems.reduce((total, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 1;
    return total + price * quantity;
  }, 0);

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-2xl mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div>
          <p>Your cart is empty</p>
          <Link
            to="/shop"
            className="inline-block mt-4 px-4 py-2 bg-white text-black rounded"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-900 p-4 rounded flex items-center gap-4"
              >
                <img
                  src={item.image || item.images?.[0]}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />

                <div className="flex-1">
                  <h2 className="text-lg">{item.name}</h2>
                  <p>₹{Number(item.price) || 0}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, "dec")}
                      className="px-3 py-1 bg-gray-700 rounded"
                    >
                      -
                    </button>

                    <span>{item.quantity || 1}</span>

                    <button
                      onClick={() => updateQuantity(item.id, "inc")}
                      className="px-3 py-1 bg-gray-700 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="bg-gray-900 p-4 rounded h-fit">
            <h2 className="text-xl mb-4">Order Summary</h2>

            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="flex justify-between mt-4 font-bold">
              <span>Total</span>
              <span>₹{subtotal}</span>
            </div>

            <Link
              to="/checkout"
              className="block text-center mt-4 bg-white text-black py-2 rounded"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
