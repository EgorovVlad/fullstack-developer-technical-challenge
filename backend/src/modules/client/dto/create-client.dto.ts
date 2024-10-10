import { Client } from '@prisma/client';
import { IsString, IsNotEmpty } from 'class-validator';

import { CreateDTOFromModel } from '@/types/api.types';

export class CreateClientDTO implements CreateDTOFromModel<Client> {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
