import { CreateOrderPayload, UpdateOrderPayload } from '@server-types/order';

import { Order } from '@/features/order/types';
import { serverApi } from '@/utils/api';

export class OrderAPI {
  static async fetchOrders() {
    const response = await serverApi.get('/orders');
    return response.data as Order[];
  }

  static async fetchOrder(id: string) {
    const response = await serverApi.get(`/orders/${id}`);
    return response.data as Order;
  }

  static async createOrder(order: CreateOrderPayload) {
    const response = await serverApi.post('/orders', order);
    return response.data as Order;
  }

  static async updateOrder(id: string, order: UpdateOrderPayload) {
    const response = await serverApi.put(`/orders/${id}`, order);
    return response.data as Order;
  }

  static async deleteOrder(id: string) {
    const response = await serverApi.delete(`/orders/${id}`);
    return response.data as Order;
  }
}
