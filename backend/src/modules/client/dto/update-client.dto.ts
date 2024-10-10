import { Client } from '@prisma/client';
import { IsString } from 'class-validator';

import { UpdateDTOFromModel } from '@/types/api.types';

export class UpdateClientDTO implements UpdateDTOFromModel<Client> {
  @IsString()
  name?: string;
}
