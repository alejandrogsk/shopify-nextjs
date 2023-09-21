import { CartInput } from "@/types/Cart";
import { shopifyFetch } from "..";
import { addToCartMutation, createCartMutation, editCartItemsMutation, removeFromCartMutation } from "../mutations/cart";
import { Cart, CartItem, Edge, ShopifyCart } from "../types";
import { getCartQuery } from "../queries/cart";

//Create cart first time
type ShopifyCreateCartOperation = {
    data: { 
        cartCreate: { cart: ShopifyCart } 
    };
};
export async function createCart() {
    return await shopifyFetch<ShopifyCreateCartOperation>({
      query: createCartMutation,
      cache: 'no-store'
    });  
}



//Add an item
type ShopifyAddToCartOperation = {
    data: {
      cartLinesAdd: {
        cart: ShopifyCart;
      };
    };
    variables: {
      cartId: string;
      lines: {
        merchandiseId: string;
        quantity: number;
      }[];
    };
  };
export async function addToCart( cartId: string, lines: { merchandiseId: string; quantity: number }[]){
    return await shopifyFetch<ShopifyAddToCartOperation>({
        query: addToCartMutation,
        variables: {
          cartId,
          lines
        },
        cache: 'no-store'
      });
}


//Get cart data
type ShopifyGetCartOperation = {
    data: {
          cart: ShopifyCart;
        };
      variables: {
        cartId: string;
      };
}
export async function getCart(cartId:string) {
    return await shopifyFetch<ShopifyGetCartOperation>({
        query: getCartQuery,
        variables: {
          cartId
        },
        cache: 'no-store'
      });
}


//Remove from cart
type ShopifyRemoveFromCartOperation = {
    data: {
      cartLinesRemove: {
        cart: ShopifyCart;
      };
    };
    variables: {
      cartId: string;
      lineIds: string[];
    };
  };
  
export async function removeFromCart(cartId: string, lineIds: string[]) {
    return await shopifyFetch<ShopifyRemoveFromCartOperation>({
      query: removeFromCartMutation,
      variables: {
        cartId,
        lineIds
      },
      cache: 'no-store'
    });
}




//Edit cart
type ShopifyUpdateCartOperation = {
    data: {
      cartLinesUpdate: {
        cart: ShopifyCart;
      };
    };
    variables: {
      cartId: string;
      lines: {
        id: string;
        merchandiseId: string;
        quantity: number;
      }[];
    };
  };
export async function updateCart(
    cartId: string,
    lines: { id: string; merchandiseId: string; quantity: number }[]
  ) {
   return await shopifyFetch<ShopifyUpdateCartOperation>({
      query: editCartItemsMutation,
      variables: {
        cartId,
        lines
      },
      cache: 'no-store'
    });
  }

  