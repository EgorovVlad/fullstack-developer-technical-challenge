import { Add } from '@mui/icons-material';
import { IconButton, IconButtonProps } from '@mui/material';
import React, { memo, useCallback } from 'react';
import { useToggle } from 'react-use';

import { ClientAPI } from '@/features/client/api/ClientAPI';
import ClientForm, { ClientFormInputs } from '@/features/client/components/ClientForm';
import { Client } from '@/features/client/types';

export interface CreateClientFormProps {
  onClose: VoidFunction;
  onClientCreated: (client: Client) => void;
}

export interface CreateClientFormButtonProps extends Omit<IconButtonProps, 'children'> {
  onClientCreated: (client: Client) => void;
}

export const CreateClientForm: React.FC<CreateClientFormProps> = memo((props) => {
  const { onClose, onClientCreated } = props;
  const handleSubmit = useCallback(
    async (data: ClientFormInputs) => {
      const client = await ClientAPI.createClient(data);
      onClientCreated(client);
    },
    [onClientCreated]
  );
  return <ClientForm onClose={onClose} onSubmit={handleSubmit} />;
});

export const CreateClientFormButton: React.FC<CreateClientFormButtonProps> = (props) => {
  const { onClientCreated, ...buttonProps } = props;
  const [isFormOpen, toggleForm] = useToggle(false);
  return (
    <>
      <IconButton {...buttonProps} onClick={toggleForm}>
        <Add />
      </IconButton>
      {isFormOpen && <CreateClientForm onClose={toggleForm} onClientCreated={onClientCreated} />}
    </>
  );
};

export default CreateClientForm;
