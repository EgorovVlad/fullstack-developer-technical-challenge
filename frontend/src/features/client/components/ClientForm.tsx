import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import React, { memo, useId } from 'react';
import { useForm } from 'react-hook-form';
import { useToggle } from 'react-use';
import { z } from 'zod';

import { Client } from '@/features/client/types';
import LoadingButton from '@/shared/components/LoadingButton';

export interface ClientFormProps {
  onClose: () => void;
  onSubmit: (client: ClientFormInputs) => Promise<void> | void;
  defaultValues?: Partial<Client>;
}

export type ClientFormInputs = z.infer<typeof clientSchema>;
const clientSchema = z.object({
  name: z.string().min(1, 'Client name is required'),
});

const ClientForm: React.FC<ClientFormProps> = memo((props) => {
  const { defaultValues, onSubmit, onClose } = props;

  const [loading, toggleLoading] = useToggle(false);
  const formId = useId();
  const isNewOrder = !defaultValues;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientFormInputs>({
    resolver: zodResolver(clientSchema),
    defaultValues,
  });

  const handleFormSubmit = async (data: ClientFormInputs) => {
    try {
      toggleLoading(true);
      await onSubmit(data);
    } catch {
      alert('Failed to save a client. Please contact support.');
    } finally {
      toggleLoading(false);
      onClose();
    }
  };

  return (
    <Dialog open fullWidth onClose={onClose}>
      <DialogTitle>{isNewOrder ? 'Add New Client' : 'Edit Client'}</DialogTitle>
      <DialogContent>
        <form id={formId} onSubmit={handleSubmit(handleFormSubmit)}>
          <TextField
            autoFocus
            margin="dense"
            label="Client Name"
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

export default ClientForm;
