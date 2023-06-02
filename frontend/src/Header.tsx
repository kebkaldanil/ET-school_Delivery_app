import { CartReducer } from "./cart";

export enum PagesEnum {
  Shop = "Shop",
  Cart = "Shoping cart",
}

interface PageLinkProps {
  onClick?: (header: PagesEnum) => void;
  page: PagesEnum;
}

const PageLink: React.FC<PageLinkProps> = ({ page, onClick }) => {
  return (
    <span className="font-bold m-2 link" onClick={onClick?.bind(null, page)}>
      {page}
    </span>
  );
};

export interface HeaderProps {
  onHeaderSelected?: (header: PagesEnum) => void;
  reducer: CartReducer;
}

const Header: React.FC<HeaderProps> = ({ onHeaderSelected, reducer }) => {
  const [cart] = reducer;
  return (
    <div className="p-4">
      <PageLink page={PagesEnum.Shop} onClick={onHeaderSelected} />|
      <PageLink page={PagesEnum.Cart} onClick={onHeaderSelected} />
      {cart.items.length}
    </div>
  );
};

export default Header;
