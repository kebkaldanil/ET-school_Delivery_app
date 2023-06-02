import { GoodEntity } from "./GoodCard";

export interface CartItem {
  good: GoodEntity;
  count: number;
}

export type PartialCartItem = Partial<CartItem> & { id: number };

export class CartState {
  private constructor(readonly items: CartItem[]) {}

  static load() {
    const loaded = localStorage.getItem("cart");
    try {
      if (loaded) {
        return new CartState(JSON.parse(loaded));
      }
    } catch (_) {}
    return new CartState([]);
  }

  save(): this {
    localStorage.setItem("cart", JSON.stringify(this.items));
    return this;
  }

  /**
   * @returns {CartItem} copy of the item with the given id or undefined if not found.
   */
  getItem(id: number): CartItem | undefined {
    const found = this.items.find((item) => item.good.id === id);
    if (found) {
      return { ...found };
    }
    return undefined;
  }

  addItem(item: GoodEntity): CartState {
    let itemChanged = false;
    const itemCopy = { ...item };
    const result = this.items.map((cartItem) => {
      if (cartItem.good.id === item.id) {
        itemChanged = true;
        return {
          good: itemCopy,
          count: cartItem.count + 1,
        };
      }
      return cartItem;
    });
    if (!itemChanged) {
      result.push({ good: itemCopy, count: 1 });
    }
    return new CartState(result).save();
  }

  setItem(item: CartItem): CartState {
    let itemChanged = false;
    const itemCopy = { ...item, good: { ...item.good } };
    const result = this.items.map((cartItem) => {
      if (cartItem.good.id === item.good.id) {
        itemChanged = true;
        return itemCopy;
      }
      return cartItem;
    });
    if (!itemChanged) {
      result.push(itemCopy);
    }
    return new CartState(result).save();
  }

  removeItem(id: number): CartState {
    const result = this.items.filter((item) => item.good.id !== id);
    return new CartState(result).save();
  }

  clear(): CartState {
    return new CartState([]).save();
  }
}

export type AddItem = {
  type: "ADD_ITEM";
  payload: GoodEntity;
};

export type RemoveItem = {
  type: "REMOVE_ITEM";
  payload: number;
};

export type SetItem = {
  type: "SET_ITEM";
  payload: CartItem;
};

export type ClearCart = {
  type: "CLEAR_CART";
};

export type CartAction = AddItem | RemoveItem | SetItem | ClearCart;

export const AddToCart = (good: GoodEntity): AddItem => ({
  type: "ADD_ITEM",
  payload: good,
});

export const RemoveFromCart = (id: number): RemoveItem => ({
  type: "REMOVE_ITEM",
  payload: id,
});

export const SetCartItem = (item: CartItem): SetItem => ({
  type: "SET_ITEM",
  payload: item,
});

export const ClearCart = (): ClearCart => ({
  type: "CLEAR_CART",
});

export const cart_reducer: React.Reducer<CartState, CartAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case "ADD_ITEM":
      return state.addItem(action.payload);
    case "REMOVE_ITEM":
      return state.removeItem(action.payload);
    case "SET_ITEM":
      return state.setItem(action.payload);
    case "CLEAR_CART":
      return state.clear();
    default:
      return state;
  }
};

export type CartReducer = [CartState, React.Dispatch<CartAction>];
