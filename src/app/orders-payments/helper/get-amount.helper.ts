import { Cart } from "src/app/carts/entities/cart.entity";
import { Product } from "src/app/products/entities/product.entity";

export const getAmount = (carts: Cart) => {
    let amount = 0;
    for (const cart of carts.products) {
      const product = cart.product as Product;
      const totalPrice = product.price - (product.discount || 0);
      amount += totalPrice * cart.quantity;
    }
    return amount;
};