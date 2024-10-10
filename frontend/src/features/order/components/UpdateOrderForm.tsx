import { Edit } from '@mui/icons-material';
import { IconButton, IconButtonProps } from '@mui/material';
import React, { useCallback, memo } from 'react';
import { useToggle } from 'react-use';

import { OrderAPI } from '@/features/order/api/OrderAPI';
import OrderForm, { OrderFormInputs } from '@/features/order/components/OrderForm';
import { Order } from '@/features/order/types';

export interface UpdateOrderFormProps {
  order: Order;
  onClose: VoidFunction;
  onOrderUpdated: (client: Order) => void;
}

export interface UpdateOrderFormButtonProps extends IconButtonProps {
  order: Order;
  onOrderUpdated: (order: Order) => void;
}

export const UpdateOrderForm: React.FC<UpdateOrderFormProps> = memo((props) => {
  const { order, onClose, onOrderUpdated } = props;
  const handleSubmit = useCallback(
    async (data: OrderFormInputs) => {
      const updatedOrder = await OrderAPI.updateOrder(order.id, data);
      onOrderUpdated(updatedOrder);
    },
    [onOrderUpdated, order.id]
  );
  return <OrderForm onClose={onClose} onSubmit={handleSubmit} defaultValues={order} />;
});

export const UpdateOrderFormButton: React.FC<UpdateOrderFormButtonProps> = (props) => {
  const { order, onOrderUpdated, ...buttonProps } = props;
  const [isFormOpen, toggleForm] = useToggle(false);
  return (
    <>
      <IconButton {...buttonProps} color="primary" onClick={toggleForm}>
        <Edit />
      </IconButton>
      {isFormOpen && <UpdateOrderForm order={order} onClose={toggleForm} onOrderUpdated={onOrderUpdated} />}
    </>
  );
};

export default UpdateOrderForm;
