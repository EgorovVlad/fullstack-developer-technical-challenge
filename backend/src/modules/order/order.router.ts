import { Router } from 'express';

import { Injection, InjectionContainer } from '@/injection';
import { OrderController } from '@/modules/order/order.controller';

const router = Router();
const orderController = InjectionContainer.get<OrderController>(Injection.OrderController);

router.post('/', orderController.createOrder);
router.get('/', orderController.getOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

export default router;
