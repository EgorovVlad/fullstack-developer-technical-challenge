import { Router } from 'express';

import { Injection, InjectionContainer } from '@/injection';
import { ClientController } from '@/modules/client/client.controller';

const router = Router();
const clientController = InjectionContainer.get<ClientController>(Injection.ClientController);

router.post('/', clientController.createClient);
router.get('/', clientController.getClients);
router.get('/:id', clientController.getClientById);
router.put('/:id', clientController.updateClient);
router.delete('/:id', clientController.deleteClient);

export default router;
