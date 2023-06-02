export interface GoodEntity {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface GoodCardProps extends Omit<GoodEntity, "id"> {
  onAddToCart?: () => void;
}

const GoodCard: React.FC<GoodCardProps> = ({
  name,
  price,
  image,
  onAddToCart,
}) => {
  return (
    <div className="border rounded-xl grid">
      <img src={image} alt={name} className="p-2" />
      <div className="flex flex-row justify-between self-end p-2">
        <div>
          <h3>{name}</h3>
          <span>${price}</span>
        </div>
        <button
          className="border rounded px-2 bg-blue-100"
          onClick={onAddToCart}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default GoodCard;
