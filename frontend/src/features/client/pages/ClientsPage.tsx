import { Breadcrumbs, Typography, Stack } from '@mui/material';
import React from 'react';

import ClientsTable from '@/features/client/components/ClientsTable';
import { useClients } from '@/features/client/stores/useClients';

const ClientsPage: React.FC = () => {
  const clients = useClients((state) => state.clients);
  const addClient = useClients((state) => state.addClient);
  const removeClient = useClients((state) => state.removeClient);
  const updateClient = useClients((state) => state.updateClient);

  return (
    <Stack gap={3}>
      <Breadcrumbs color="primary">
        <Typography color="secondary">Clients</Typography>
      </Breadcrumbs>
      <ClientsTable
        clients={clients}
        onClientCreated={addClient}
        onClientDeleted={removeClient}
        onClientUpdated={updateClient}
      />
    </Stack>
  );
};

export default ClientsPage;
