import { Add } from '@mui/icons-material';
import { IconButton, IconButtonProps } from '@mui/material';
import React, { memo, useCallback } from 'react';
import { useToggle } from 'react-use';

import { OrderAPI } from '@/features/order/api/OrderAPI';
import OrderForm, { OrderFormInputs } from '@/features/order/components/OrderForm';
import { Order } from '@/features/order/types';

export interface CreateOrderFormProps {
  clientId: string;
  onClose: VoidFunction;
  onClientCreated: (client: Order) => void;
}

export interface CreateOrderFormButtonProps extends Omit<IconButtonProps, 'children'> {
  clientId: string;
  onClientCreated: (client: Order) => void;
}

export const CreateOrderForm: React.FC<CreateOrderFormProps> = memo((props) => {
  const { onClose, onClientCreated } = props;
  const handleSubmit = useCallback(
    async (data: OrderFormInputs) => {
      const newOrder = await OrderAPI.createOrder({
        ...data,
        clientId: props.clientId,
      });
      onClientCreated(newOrder);
    },
    [onClientCreated, props.clientId]
  );
  return <OrderForm onClose={onClose} onSubmit={handleSubmit} />;
});

export const CreateOrderFormButton: React.FC<CreateOrderFormButtonProps> = (props) => {
  const { clientId, onClientCreated, ...buttonProps } = props;
  const [isFormOpen, toggleForm] = useToggle(false);
  return (
    <>
      <IconButton {...buttonProps} onClick={toggleForm}>
        <Add />
      </IconButton>
      {isFormOpen && <CreateOrderForm clientId={clientId} onClose={toggleForm} onClientCreated={onClientCreated} />}
    </>
  );
};

export default CreateOrderForm;
