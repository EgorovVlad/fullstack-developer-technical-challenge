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

import { ClientAPI } from '@/features/client/api/ClientAPI';
import { Client } from '@/features/client/types';
import LoadingButton from '@/shared/components/LoadingButton';

interface DeleteClientButtonProps {
  clientId: string;
  onClientDeleted: (client: Client) => void;
}

const DeleteClientButton: React.FC<DeleteClientButtonProps> = memo((props) => {
  const { clientId, onClientDeleted } = props;
  const [open, toggleOpen] = useToggle(false);
  const [loading, toggleLoading] = useToggle(false);

  const handleDelete = async () => {
    try {
      toggleLoading(true);
      const client = await ClientAPI.deleteClient(clientId);
      onClientDeleted(client);
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
        <DialogTitle>Delete Client</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this client? This action cannot be undone.
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

export default DeleteClientButton;
