import { useCallback, useState } from "react";
import { ShopEntity } from "./Shop";
import { GoodEntity } from "./GoodCard";
import ShopsList from "./ShopList";
import GoodGrid from "./GoodsGrid";
import { AddToCart, CartReducer } from "./cart";
import { API_URL } from "./constants";

export interface ShopingPageProps {
  reducer: CartReducer;
}

const ShopingPage: React.FC<ShopingPageProps> = ({ reducer }) => {
  const [, dispatch] = reducer;
  const [shops, setShops] = useState<ShopEntity[]>([]);
  const [goods, setGoods] = useState<GoodEntity[]>([]);
  const selectShop = useCallback(
    (shop: ShopEntity) => {
      fetch(`${API_URL}/goods/for-shop/${shop.id}`)
        .then((res) => res.json())
        .then((goods) => setGoods(goods));
    },
    [shops],
  );
  return (
    <div className="flex flex-row gap-4">
      <ShopsList
        shops={shops}
        onShopsLoaded={setShops}
        selectShop={selectShop}
      />
      <GoodGrid goods={goods} addToCart={(good) => dispatch(AddToCart(good))} />
    </div>
  );
};

export default ShopingPage;
