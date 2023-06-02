import { useEffect } from "react";
import Shop, { ShopEntity } from "./Shop";
import { API_URL } from "./constants";

export interface ShopListProps {
  shops: ShopEntity[];
  selectShop: (shop: ShopEntity) => void;
  onShopsLoaded: (shops: ShopEntity[]) => void;
}

const ShopsList: React.FunctionComponent<ShopListProps> = ({
  shops,
  selectShop,
  onShopsLoaded,
}) => {
  useEffect(() => {
    fetch(`${API_URL}/shops`)
      .then((res) => res.json())
      .then((data) => onShopsLoaded(data));
  }, []);
  return (
    <div>
      {shops.map((shop) => (
        <Shop {...shop} onClick={selectShop.bind(null, shop)} key={shop.id} />
      ))}
    </div>
  );
};

export default ShopsList;
