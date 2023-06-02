import { useCallback } from "react";
import CartGoodCard from "./CartGoodCard";
import {
  AddToCart,
  CartReducer,
  ClearCart,
  RemoveFromCart,
  SetCartItem,
} from "./cart";
import { API_URL } from "./constants";
import { useLocalStorage } from "./useLocalStorage";

export interface CartPageProps {
  reducer: CartReducer;
}

const CartPage: React.FC<CartPageProps> = ({ reducer }) => {
  const [cart, dispatch] = reducer;
  const [name, setName] = useLocalStorage("name");
  const [email, setEmail] = useLocalStorage("email");
  const [phone, setPhone] = useLocalStorage("phone");
  const [address, setAddress] = useLocalStorage("address");
  const makeOrder: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      if (cart.items.length === 0) {
        alert("Cart is empty");
        return;
      }
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const obj = Object.fromEntries(formData.entries());
      fetch(`${API_URL}/order`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...obj,
          items: cart.items.map((item) => ({
            good: item.good.id,
            count: item.count,
          })),
        }),
      }).then((res) => {
        if (res.ok) {
          alert("Order has been made");
          dispatch(ClearCart());
        }
      });
    },
    [cart],
  );
  return (
    <div className="flex flex-row p-2">
      <form className="w-1/2" onSubmit={makeOrder}>
        <label className="block border my-2 p-1">
          Name:
          <input
            className="border w-full p-0.5"
            type="text"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="block border my-2 p-1">
          Email:
          <input
            className="border w-full p-0.5"
            type="text"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="block border my-2 p-1">
          Phone:
          <input
            className="border w-full p-0.5"
            type="text"
            name="phone"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label className="block border my-2 p-1">
          Address:
          <input
            className="border w-full p-0.5"
            type="text"
            name="address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="border rounded p-2 bg-blue-100 hover:bg-blue-200 w-full my-2"
        >
          Order
        </button>
      </form>
      <div className="grid grid-cols-1 w-full">
        {cart.items.map((item) => (
          <div key={item.good.id} className="flex">
            <CartGoodCard
              {...item.good}
              count={item.count}
              onAddToCart={dispatch.bind(null, AddToCart(item.good))}
              onRemoveFromCart={dispatch.bind(
                null,
                RemoveFromCart(item.good.id),
              )}
              onCountChange={(count) =>
                dispatch(
                  SetCartItem({
                    good: item.good,
                    count: Math.max(1, count),
                  }),
                )
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPage;
