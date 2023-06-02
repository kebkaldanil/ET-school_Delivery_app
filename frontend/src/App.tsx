import { useReducer, useState } from "react";
import ShopingPage from "./ShopingPage";
import { CartState, cart_reducer } from "./cart";
import Header, { PagesEnum } from "./Header";
import CartPage from "./CartPage";

function App() {
  const reducer = useReducer(cart_reducer, CartState.load());
  const [selectedPage, selectPage] = useState(PagesEnum.Shop);
  let page: JSX.Element;
  switch (selectedPage) {
    case PagesEnum.Shop:
      page = <ShopingPage reducer={reducer} />;
      break;
    case PagesEnum.Cart:
      page = <CartPage reducer={reducer} />;
      break;
  }
  return (
    <div className="App">
      <Header reducer={reducer} onHeaderSelected={selectPage} />
      {page}
    </div>
  );
}

export default App;
