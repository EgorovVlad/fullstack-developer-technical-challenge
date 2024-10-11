import { Typography, Breadcrumbs, List, ListItem, ListItemText, Paper, Stack } from '@mui/material';
import React from 'react';
import { useParams, Link } from 'react-router-dom';

import { UpdateClientFormButton } from '@/features/client/components/UpdateClientForm';
import { useClients } from '@/features/client/stores/useClients';
import OrdersTable from '@/features/order/components/OrdersTable';
import { useOrders, useOrdersByClientId } from '@/features/order/stores/useOrders';
import { formatStringDate } from '@/utils/date';

const PageBreadcrumb: React.FC = () => (
  <Breadcrumbs color="primary">
    <Typography component={Link} to="/clients">
      Clients
    </Typography>
    <Typography color="secondary">Client Details</Typography>
  </Breadcrumbs>
);

const ClientDetailsPage: React.FC = () => {
  const { clientId } = useParams() as { clientId: string };

  const client = useClients((state) => state.getClientById(clientId));
  const updateClient = useClients((state) => state.updateClient);

  const orders = useOrdersByClientId(clientId);
  const addOrder = useOrders((state) => state.addOrder);
  const updateOrder = useOrders((state) => state.updateOrder);
  const removeOrder = useOrders((state) => state.removeOrder);

  if (!client) {
    return (
      <Stack gap={3}>
        <PageBreadcrumb />
        <Typography variant="h6">Client not found</Typography>
      </Stack>
    );
  }

  return (
    <Stack gap={3}>
      <PageBreadcrumb />
      <Paper sx={{ position: 'relative' }}>
        <UpdateClientFormButton
          sx={{ position: 'absolute', top: 5, right: 5, zIndex: 1 }}
          client={client}
          onClientUpdated={updateClient}
        />
        <List>
          <ListItem>
            <ListItemText primary="Name" secondary={client.name} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Created" secondary={formatStringDate(client.createdAt)} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Updated" secondary={formatStringDate(client.updatedAt)} />
          </ListItem>
        </List>
      </Paper>
      <OrdersTable
        orders={orders}
        clientId={clientId}
        onOrderCreated={addOrder}
        onOrderDeleted={removeOrder}
        onOrderUpdated={updateOrder}
      />
    </Stack>
  );
};

export default ClientDetailsPage;
