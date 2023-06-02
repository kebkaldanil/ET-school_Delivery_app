import React from "react";
import GoodCard, { GoodEntity } from "./GoodCard";

export interface GoodGridProps {
  goods: GoodEntity[];
  addToCart: (good: GoodEntity) => void;
}

const GoodGrid: React.FC<GoodGridProps> = ({ goods, addToCart }) => {
  return (
    <div className="goods-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-2">
      {goods.map((good) => (
        <GoodCard
          {...good}
          key={good.id}
          onAddToCart={addToCart.bind(null, good)}
        />
      ))}
    </div>
  );
};

export default GoodGrid;
