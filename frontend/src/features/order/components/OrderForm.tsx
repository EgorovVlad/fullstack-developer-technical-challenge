import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import React, { memo, useId } from 'react';
import { useForm } from 'react-hook-form';
import { useToggle } from 'react-use';
import { z } from 'zod';

import { Order } from '@/features/order/types';
import LoadingButton from '@/shared/components/LoadingButton';

interface OrderFormProps {
  onClose: () => void;
  onSubmit: (client: OrderFormInputs) => Promise<void> | void;
  defaultValues?: Partial<Order>;
}

export type OrderFormInputs = z.infer<typeof orderSchema>;
const orderSchema = z.object({
  name: z.string().min(1, 'Order name is required'),
});

const OrderForm: React.FC<OrderFormProps> = memo((props) => {
  const { defaultValues, onClose, onSubmit } = props;

  const [loading, toggleLoading] = useToggle(false);
  const formId = useId();
  const isNewOrder = !defaultValues;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormInputs>({
    resolver: zodResolver(orderSchema),
    defaultValues,
  });

  const handleFormSubmit = async (data: OrderFormInputs) => {
    try {
      toggleLoading(true);
      await onSubmit(data);
    } catch {
      alert('Failed to save an order. Please contact support.');
    } finally {
      toggleLoading(false);
      onClose();
    }
  };

  return (
    <Dialog open fullWidth onClose={onClose}>
      <DialogTitle>{isNewOrder ? 'Add New Order' : 'Edit Order'}</DialogTitle>
      <DialogContent>
        <form id={formId} onSubmit={handleSubmit(handleFormSubmit)}>
          <TextField
            autoFocus
            margin="dense"
            label="Order Name"
            fullWidth
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} onClick={onClose}>
          Cancel
        </Button>
        <LoadingButton loading={loading} type="submit" color="primary" form={formId}>
          {isNewOrder ? 'Add' : 'Update'}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
});

export default OrderForm;
