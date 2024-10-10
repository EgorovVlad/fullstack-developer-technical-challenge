import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { injectable, inject } from 'inversify';

import { ValidateDTO } from '@/decorators/validate-dto.decorator';
import { AppError } from '@/errors/app.error';
import { Injection } from '@/injection';
import { ClientService } from '@/modules/client/client.service';
import { CreateClientDTO } from '@/modules/client/dto/create-client.dto';
import { UpdateClientDTO } from '@/modules/client/dto/update-client.dto';
import { autoBindClassMethods } from '@/utils/auto-bind-class-methods';

@injectable()
export class ClientController {
  constructor(@inject(Injection.ClientService) private clientService: ClientService) {
    autoBindClassMethods(this);
  }

  @ValidateDTO(CreateClientDTO)
  async createClient(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body as CreateClientDTO;
    const client = await this.clientService.createClient({ name });
    res.json(client);
  }

  async getClients(req: Request, res: Response, next: NextFunction) {
    const clients = await this.clientService.getClients();
    res.json(clients);
  }

  async getClientById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const client = await this.clientService.getClientById(id);
    if (!client) {
      throw new AppError(`Client with id ${id} not found`, StatusCodes.NOT_FOUND);
    }
    res.json(client);
  }

  @ValidateDTO(UpdateClientDTO)
  async updateClient(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const clientExists = await this.clientService.checkExists(id);
    if (!clientExists) {
      throw new AppError(`Client with id ${id} not found`, StatusCodes.NOT_FOUND);
    }
    const client = await this.clientService.updateClient(id, req.body);
    res.json(client);
  }

  async deleteClient(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const clientExists = await this.clientService.checkExists(id);
    if (!clientExists) {
      throw new AppError(`Client with id ${id} not found`, StatusCodes.NOT_FOUND);
    }
    const client = await this.clientService.deleteClient(id);
    res.json(client);
  }
}
