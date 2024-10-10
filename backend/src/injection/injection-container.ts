import { Container } from 'inversify';

import { ClientController } from '@/modules/client/client.controller';
import { ClientService } from '@/modules/client/client.service';
import { OrderController } from '@/modules/order/order.controller';
import { OrderService } from '@/modules/order/order.service';
import { PrismaService } from '@/modules/prisma/prisma.service';

import { Injection } from './injection';

// Bind services and controllers
const InjectionContainer = new Container();

InjectionContainer.bind(Injection.PrismaService).to(PrismaService).inSingletonScope();
InjectionContainer.bind(Injection.ClientService).to(ClientService);
InjectionContainer.bind(Injection.OrderService).to(OrderService);
InjectionContainer.bind(Injection.ClientController).to(ClientController);
InjectionContainer.bind(Injection.OrderController).to(OrderController);

export { InjectionContainer };
