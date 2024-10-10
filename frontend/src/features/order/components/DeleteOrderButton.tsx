import { Delete } from '@mui/icons-material';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  IconButton,
} from '@mui/material';
import React, { memo } from 'react';
import { useToggle } from 'react-use';

import { OrderAPI } from '@/features/order/api/OrderAPI';
import { Order } from '@/features/order/types';
import LoadingButton from '@/shared/components/LoadingButton';

interface DeleteOrderButtonProps {
  orderId: string;
  onOrderDeleted: (order: Order) => void;
}

const DeleteOrderButton: React.FC<DeleteOrderButtonProps> = memo((props) => {
  const { orderId, onOrderDeleted } = props;
  const [open, toggleOpen] = useToggle(false);
  const [loading, toggleLoading] = useToggle(false);

  const handleDelete = async () => {
    try {
      toggleLoading(true);
      const order = await OrderAPI.deleteOrder(orderId);
      onOrderDeleted(order);
    } catch {
      alert('Failed to delete a client. Please contact support.');
    } finally {
      toggleOpen(false);
      toggleLoading(false);
    }
  };

  return (
    <>
      <IconButton color="error" onClick={toggleOpen}>
        <Delete />
      </IconButton>
      <Dialog open={open} onClose={toggleOpen}>
        <DialogTitle>Delete Order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this order? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={toggleOpen}>
            Cancel
          </Button>
          <LoadingButton loading={loading} onClick={handleDelete} color="primary">
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
});

export default DeleteOrderButton;
