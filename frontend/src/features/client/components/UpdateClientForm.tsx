import { Edit } from '@mui/icons-material';
import { IconButton, IconButtonProps } from '@mui/material';
import React, { memo, useCallback } from 'react';
import { useToggle } from 'react-use';

import { ClientAPI } from '@/features/client/api/ClientAPI';
import ClientForm, { ClientFormInputs } from '@/features/client/components/ClientForm';
import { Client } from '@/features/client/types';

export interface UpdateClientFormProps {
  client: Client;
  onClose: VoidFunction;
  onClientUpdated: (client: Client) => void;
}

export interface UpdateClientFormButtonProps extends Omit<IconButtonProps, 'children'> {
  client: Client;
  onClientUpdated: (client: Client) => void;
}

export const UpdateClientForm: React.FC<UpdateClientFormProps> = memo((props) => {
  const { client, onClose, onClientUpdated } = props;
  const handleSubmit = useCallback(
    async (data: ClientFormInputs) => {
      const updatedClient = await ClientAPI.updateClient(client.id, data);
      onClientUpdated(updatedClient);
    },
    [client.id, onClientUpdated]
  );
  return <ClientForm onClose={onClose} onSubmit={handleSubmit} defaultValues={client} />;
});

export const UpdateClientFormButton: React.FC<UpdateClientFormButtonProps> = (props) => {
  const { client, onClientUpdated, ...buttonProps } = props;
  const [isFormOpen, toggleForm] = useToggle(false);
  return (
    <>
      <IconButton {...buttonProps} color="primary" onClick={toggleForm}>
        <Edit />
      </IconButton>
      {isFormOpen && <UpdateClientForm client={client} onClose={toggleForm} onClientUpdated={onClientUpdated} />}
    </>
  );
};

export default UpdateClientForm;
