import { useMemo } from 'react';
import { create } from 'zustand';

import { OrderAPI } from '@/features/order/api/OrderAPI';
import { Order } from '@/features/order/types';
import { InferZustandParams } from '@/types';

export const useOrders = create((...args: unknown[]) => {
  const [set] = args as InferZustandParams<typeof useOrders>;
  return {
    orders: [] as Order[],
    ordersLoading: false,
    fetchOrders: async () => {
      set({ ordersLoading: true });
      const orders = await OrderAPI.fetchOrders();
      set({ orders, ordersLoading: false });
    },
    addOrder: (order: Order) => {
      return set((state) => ({ orders: [...state.orders, order] }));
    },
    removeOrder: (order: Order) => {
      return set((state) => ({ orders: state.orders.filter((storeOrder) => storeOrder.id !== order.id) }));
    },
    updateOrder: (order: Order) => {
      return set((state) => ({
        orders: state.orders.map((storeOrder) => (storeOrder.id === order.id ? order : storeOrder)),
      }));
    },
  };
});

export const useOrdersByClientId = (clientId: string) => {
  const orders = useOrders((state) => state.orders);
  return useMemo(() => orders.filter((order) => order.clientId === clientId), [orders, clientId]);
};
