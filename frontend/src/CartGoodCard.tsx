import { GoodEntity } from "./GoodCard";

export interface CartGoodCardProps extends Omit<GoodEntity, "id"> {
  onAddToCart?: () => void;
  onRemoveFromCart?: () => void;
  onCountChange?: (count: number) => void;
  count: number;
}

const CartGoodCard: React.FC<CartGoodCardProps> = ({
  name,
  price,
  image,
  count,
  onAddToCart,
  onRemoveFromCart,
  onCountChange,
}) => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 border border-gray-300 m-2">
      <img className="w-80 col-span-1 row-span-2" src={image} alt={name} />
      <div className="col-span-1 row-span-1 m-2 justify-self-center self-center">
        <h3>{name}</h3>
        <p>${price}</p>
        <label>
          Count:{" "}
          <input
            type="number"
            value={count}
            className="border rounded p-2 m-1"
            onChange={
              onCountChange && ((e) => onCountChange(e.target.valueAsNumber))
            }
          />
        </label>
      </div>
      <div className="self-center justify-self-center">
        <button
          className="border rounded p-2  bg-blue-100 m-1"
          onClick={onAddToCart}
        >
          Add More
        </button>
        <button
          className="border rounded p-2  bg-red-200 m-1"
          onClick={onRemoveFromCart}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartGoodCard;
