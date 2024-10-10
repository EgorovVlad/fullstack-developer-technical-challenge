import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { injectable, inject } from 'inversify';

import { ValidateDTO } from '@/decorators/validate-dto.decorator';
import { AppError } from '@/errors/app.error';
import { Injection } from '@/injection';
import { ClientService } from '@/modules/client/client.service';
import { CreateOrderDTO } from '@/modules/order/dto/create-order.dto';
import { UpdateOrderDTO } from '@/modules/order/dto/update-order.dto';
import { OrderService } from '@/modules/order/order.service';
import { autoBindClassMethods } from '@/utils/auto-bind-class-methods';

@injectable()
export class OrderController {
  constructor(
    @inject(Injection.OrderService) private orderService: OrderService,
    @inject(Injection.ClientService) private clientService: ClientService
  ) {
    autoBindClassMethods(this);
  }

  @ValidateDTO(CreateOrderDTO)
  async createOrder(req: Request, res: Response, next: NextFunction) {
    const { name, clientId } = req.body as CreateOrderDTO;
    const client = clientId ? await this.clientService.checkExists(clientId) : null;
    if (!client) {
      throw new AppError(`Client with id ${clientId} not found`, StatusCodes.NOT_FOUND);
    }
    const order = await this.orderService.createOrder({ name, clientId });
    res.json(order);
  }

  async getOrders(req: Request, res: Response, next: NextFunction) {
    const orders = await this.orderService.getOrders();
    res.json(orders);
  }

  async getOrderById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const order = await this.orderService.getOrderById(id);
    if (!order) {
      throw new AppError(`Order with id ${id} not found`, StatusCodes.NOT_FOUND);
    }
    res.json(order);
  }

  @ValidateDTO(UpdateOrderDTO)
  async updateOrder(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { name, clientId } = req.body as UpdateOrderDTO;

    const orderExists = await this.orderService.checkExists(id);
    if (!orderExists) {
      throw new AppError(`Order with id ${id} not found`, StatusCodes.NOT_FOUND);
    }

    const clientExists = clientId ? await this.clientService.checkExists(clientId) : false;
    if (!clientExists) {
      throw new AppError(`Client with id ${clientId} not found`, StatusCodes.NOT_FOUND);
    }

    const order = await this.orderService.updateOrder(id, { name, clientId });
    res.json(order);
  }

  async deleteOrder(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const orderExists = await this.orderService.checkExists(id);
    if (!orderExists) {
      throw new AppError(`Order with id ${id} not found`, StatusCodes.NOT_FOUND);
    }
    const order = await this.orderService.deleteOrder(id);
    res.json(order);
  }
}
