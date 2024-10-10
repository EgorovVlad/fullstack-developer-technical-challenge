import { PrismaClient } from '@prisma/client';
import { injectable } from 'inversify';

import { autoBindClassMethods } from '@/utils/auto-bind-class-methods';

@injectable()
export class PrismaService {
  public prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
    autoBindClassMethods(this);
  }

  async connect() {
    await this.prisma.$connect();
  }

  async disconnect() {
    await this.prisma.$disconnect();
  }
}
