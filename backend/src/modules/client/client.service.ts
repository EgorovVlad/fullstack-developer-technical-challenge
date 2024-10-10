import { inject, injectable } from 'inversify';

import { Injection } from '@/injection';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { autoBindClassMethods } from '@/utils/auto-bind-class-methods';

@injectable()
export class ClientService {
  constructor(@inject(Injection.PrismaService) private prismaService: PrismaService) {
    autoBindClassMethods(this);
  }

  async createClient(data: { name: string }) {
    return this.prismaService.prisma.client.create({ data });
  }

  async getClients() {
    return this.prismaService.prisma.client.findMany();
  }

  async getClientById(id: string) {
    return this.prismaService.prisma.client.findUnique({ where: { id } });
  }

  async updateClient(id: string, data: { name?: string }) {
    return this.prismaService.prisma.client.update({ where: { id }, data });
  }

  async deleteClient(id: string) {
    return this.prismaService.prisma.client.delete({ where: { id } });
  }

  async checkExists(id: string): Promise<boolean> {
    const count = await this.prismaService.prisma.client.count({ where: { id }, take: 1 });
    return count > 0;
  }
}
