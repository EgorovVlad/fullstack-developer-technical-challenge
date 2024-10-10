import { TableRow, Table, TableHead, TableCell, TableBody, Typography, Paper, TableContainer } from '@mui/material';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { CreateClientFormButton } from '@/features/client/components/CreateClientForm';
import DeleteClientButton from '@/features/client/components/DeleteClientButton';
import { UpdateClientFormButton } from '@/features/client/components/UpdateClientForm';
import { Client } from '@/features/client/types';

export interface ClientsTableProps {
  clients: Client[];
  onClientDeleted: (client: Client) => void;
  onClientUpdated: (client: Client) => void;
  onClientCreated: (client: Client) => void;
}

export const ClientsTable: React.FC<ClientsTableProps> = memo((props) => {
  const { clients, onClientDeleted, onClientUpdated, onClientCreated } = props;
  return (
    <TableContainer component={Paper} sx={{ tableLayout: 'fixed' }}>
      <Table sx={{ overflow: 'hidden' }}>
        <TableHead>
          <TableRow>
            <TableCell colSpan={3} valign="middle">
              <Typography component="span">Clients</Typography>{' '}
              <CreateClientFormButton onClientCreated={onClientCreated} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Client ID</TableCell>
            <TableCell>Client Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell sx={(theme) => ({ maxWidth: 100, color: theme.palette.primary.main })} className="truncate">
                <Link to={`/clients/${client.id}`}>{client.id}</Link>
              </TableCell>
              <TableCell className="truncate">{client.name}</TableCell>
              <TableCell>
                <UpdateClientFormButton client={client} onClientUpdated={onClientUpdated} />
                <DeleteClientButton clientId={client.id} onClientDeleted={onClientDeleted} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default ClientsTable;
