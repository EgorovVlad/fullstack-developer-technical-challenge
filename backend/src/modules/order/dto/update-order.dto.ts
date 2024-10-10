import { Order } from '@prisma/client';
import { IsString } from 'class-validator';

import { UpdateDTOFromModel } from '@/types/api.types';

export class UpdateOrderDTO implements UpdateDTOFromModel<Order> {
  @IsString()
  name?: string;

  @IsString()
  clientId?: string;
}
