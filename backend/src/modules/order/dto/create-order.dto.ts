import { Order } from '@prisma/client';
import { IsString, IsNotEmpty } from 'class-validator';

import { CreateDTOFromModel } from '@/types/api.types';

export class CreateOrderDTO implements CreateDTOFromModel<Order> {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  clientId!: string;
}
