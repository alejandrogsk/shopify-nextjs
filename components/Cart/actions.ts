"use server"
import { addToCart, createCart, getCart, removeFromCart, updateCart } from "@/lib/shopify/functions/cart";
import { cookies } from "next/headers";
import { customerData } from "../Auth/actions";

//Add item to the cart
export const addItem = async (productId: string) => {
  const cartId = await createCartIfNeeded();
  await addItemToCart(cartId, productId)
}

const createCartIfNeeded = async ():Promise<string|undefined> => {
  //const clientEmail = await customerData()

  let cartId = cookies().get('cartId')?.value;
  try {
    if (cartId === undefined) {
      const cart = await createCart();
      if (cart.status === 200) {
        let id = cart.body.data.cartCreate.cart.id;
        console.log("cart created____________________°°°°°°°°°°°°°°°", cart.body.data.cartCreate.cart)
        cookies().set("cartId", id);
        cartId = id;
      } else {
        throw new Error("Error creating the cart");
      }
    }
  } catch (error) {
    console.log("Error", error);
    throw new Error("Error trying to get or create the cart");
  }
  return cartId;
};
const addItemToCart = async (cartId:string|undefined, productId:string, productQuantity = 1) => {
  try {
    if (!cartId || !productId) {
      throw new Error("Missing cartId or productId");
    }

    const cartWithData = await addToCart(cartId, [
      {
        merchandiseId: productId,
        quantity: productQuantity,
      },
    ]);
    console.log("cartWithData", cartWithData);
  } catch (error) {
    console.log("Error", error);
    throw new Error("Error trying to add product to the cart");
  }
};


//Get the data from the cart
export const getCartData = async() => {
  let cartId = cookies().get('cartId')?.value;
  if(!cartId) return null;
  return await getCart(cartId)
}


export const removeItem = async (lineId: string): Promise<String | undefined> => {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return 'Missing cart ID';
  }
  try {
    await removeFromCart(cartId, [lineId]);
  } catch (e) {
    return 'Error removing item from cart';
  }
};



export const updateItemQuantity = async ({
  lineId,
  variantId,
  quantity
}: {
  lineId: string;
  variantId: string;
  quantity: number;
}): Promise<String | undefined> => {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return 'Missing cart ID';
  }
  try {
    await updateCart(cartId, [
      {
        id: lineId,
        merchandiseId: variantId,
        quantity
      }
    ]);
  } catch (e) {
    return 'Error updating item quantity';
  }
};