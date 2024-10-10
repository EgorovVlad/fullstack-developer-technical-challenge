import { Router } from 'express';

import clientRouter from '@/modules/client/client.router';
import orderRouter from '@/modules/order/order.router';

const router = Router();

router.use('/clients', clientRouter);
router.use('/orders', orderRouter);

export default router;
