import { injectable, inject } from 'inversify';

import { Injection } from '@/injection';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { autoBindClassMethods } from '@/utils/auto-bind-class-methods';

@injectable()
export class OrderService {
  constructor(@inject(Injection.PrismaService) private prismaService: PrismaService) {
    autoBindClassMethods(this);
  }

  async createOrder(data: { name: string; clientId: string }) {
    return this.prismaService.prisma.order.create({ data });
  }

  async getOrders() {
    return this.prismaService.prisma.order.findMany();
  }

  async getOrderById(id: string) {
    return this.prismaService.prisma.order.findUnique({ where: { id } });
  }

  async updateOrder(id: string, data: { name?: string; clientId?: string }) {
    return this.prismaService.prisma.order.update({ where: { id }, data });
  }

  async deleteOrder(id: string) {
    return this.prismaService.prisma.order.delete({ where: { id } });
  }

  async checkExists(id: string): Promise<boolean> {
    const count = await this.prismaService.prisma.order.count({ where: { id }, take: 1 });
    return count > 0;
  }
}
