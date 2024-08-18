import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { removeItemFromCart, updateItemQuantity } from "../redux/cartSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { items, totalPrice, totalQuantity } = useSelector(
    (state: RootState) => state.cart
  );

  const [shippingCost, setShippingCost] = useState<number>(5);

  const handleRemove = (productId: number) => {
    dispatch(removeItemFromCart({ productId }));
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    dispatch(updateItemQuantity({ productId, quantity }));
  };

  return (
    <section className="bg-gray-100 min-h-screen py-8">
      <div className="mx-auto px-6 py-4 max-sm:px-4 max-sm:py-2">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-4xl font-bold text-gray-900 max-sm:text-2xl">
                Shopping Cart
              </h1>
              <h6 className="text-gray-500 text-xl">{items.length} items</h6>
            </div>

            <hr className="border-gray-300 mb-6" />

            {items.map((item) => (
              <div
                key={item.product.id}
                className="relative w-full h-36 flex flex-row gap-3 items-center sm:items-start mb-6 p-4 border-b border-gray-300 max-sm:py-2 max-sm:px-0 "
              >
                <img
                  src={
                    import.meta.env.VITE_API_UP_URL +
                    item.product.attributes.img.data.attributes.url
                  }
                  alt={item.product.attributes.title}
                  className="w-26 h-full object-cover rounded-md mb-4"
                />
                <div className="flex-1 sm:mx-4">
                  <h6 className="text-gray-600 text-lg">
                    {
                      item.product.attributes.categories.data[0].attributes
                        .title
                    }
                  </h6>
                  <h6 className="text-gray-900 text-xl font-semibold max-sm:text-lg">
                    {item.product.attributes.title}
                  </h6>
                  <div className="flex items-center mt-2 gap-2">
                    <button
                      className="text-gray-600 hover:text-gray-900 text-lg"
                      onClick={() =>
                        handleUpdateQuantity(item.product.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      <RemoveIcon />
                    </button>
                    <div
                      className="text-gray-900 font-semibold"
                      aria-live="polite"
                    >
                      {item.quantity}
                    </div>
                    <button
                      className="text-gray-600 hover:text-gray-900 text-lg"
                      onClick={() =>
                        handleUpdateQuantity(item.product.id, item.quantity + 1)
                      }
                    >
                      <AddIcon />
                    </button>
                  </div>
                </div>
                <div className="">
                  <div className="text-gray-900 font-semibold text-xl mt-0 absolute bottom-5 right-2 max-sm:bottom-6 max-sm:text-lg max-sm:font-normal">
                    $ {item.product.attributes.price.toFixed(2)}
                  </div>
                </div>
                <button
                  className="absolute top-0 right-2 text-gray-600 hover:text-gray-900 text-xl"
                  onClick={() => handleRemove(item.product.id)}
                >
                  <DeleteIcon />
                </button>
              </div>
            ))}

            <hr className="border-gray-300 mb-6" />

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Summary</h3>
              <hr className="border-gray-300 mb-4" />
              <div className="flex justify-between mb-4 text-lg">
                <h5 className="text-gray-900">Items {totalQuantity}</h5>
                <h5 className="text-gray-900">$ {totalPrice.toFixed(2)}</h5>
              </div>
              <h5 className="text-lg text-gray-900 mb-3">Shipping</h5>
              <div className="mb-4">
                <select
                  className="form-select block w-full bg-white border border-gray-300 rounded-md shadow-sm"
                  onChange={(event) => {
                    const shippingCosts: { [key: string]: number } = {
                      "1": 5.0,
                      "2": 10.0,
                      "3": 15.0,
                    };
                    setShippingCost(shippingCosts[event.target.value] || 0);
                  }}
                >
                  <option value="1">Standard Delivery - $5.00</option>
                  <option value="2">Two-Day Delivery - $10.00</option>
                  <option value="3">Next-Day Delivery - $15.00</option>
                </select>
              </div>

              <div className="flex justify-between font-bold text-lg">
                <h5>Total Price</h5>
                <h5>$ {(totalPrice + shippingCost).toFixed(2)}</h5>
              </div>
              <button className="w-full bg-black text-white py-2 rounded mt-4">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
