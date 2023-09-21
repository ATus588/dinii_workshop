import { useHistoryItems } from "hooks/useHistoryItems";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { HistoryItemList } from "pages/history/HistoryItemList";
import { Fab } from "pages/index/Fab";
import { Header } from "pages/cart/Header";
import React, { useCallback } from "react";

import { useCartOrderCartItemsMutation } from "pages/cart/queries";
import { useCartItems } from "hooks/useCartItems";
import { useIndexAddMenuIntoCartMutation, useIndexRemoveMenuFromCartMutation } from "pages/index/queries";

const Cart = () => {
  const { historyItems } = useHistoryItems();

  const [orderCartItems] = useCartOrderCartItemsMutation();

  const router = useRouter();
  const onOrderCartItems = useCallback(async () => {
    await orderCartItems();
    await router.back();
  }, [orderCartItems, router]);

  const { cartItems } = useCartItems();

  const [addMenuIntoCart] = useIndexAddMenuIntoCartMutation();

  const [removeMenuFromCart] = useIndexRemoveMenuFromCartMutation();

  const onAdd = useCallback((menuId: string) => addMenuIntoCart({ variables: { input: { menuId, quantity: 1 } } }), [addMenuIntoCart]);

  const onRemove = useCallback((menuId: string) => removeMenuFromCart({ variables: { input: { menuId, quantity: 1 } } }), [removeMenuFromCart]);

  return (
    <>
      <Head>
        <title>MO App</title>
      </Head>
      <Header />
      <HistoryItemList historyItems={historyItems} cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} />
      <Fab cartItems={cartItems} />
    </>
  );
};

export default Cart;
