export interface ShopEntity {
  id: number;
  name: string;
}

export interface ShopProps extends Omit<ShopEntity, "id"> {
  onClick?: () => void;
}

const Shop: React.FC<ShopProps> = ({ name, onClick }) => {
  return (
    <button
      className="border rounded block m-2 p-1 w-40 bg-blue-100 hover:bg-blue-200"
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Shop;
