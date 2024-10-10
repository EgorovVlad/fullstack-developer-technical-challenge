import { TableHead, TableRow, TableCell, TableBody, Table, Paper, TableContainer, Typography } from '@mui/material';
import React, { memo } from 'react';

import { CreateOrderFormButton } from '@/features/order/components/CreateOrderForm';
import DeleteOrderButton from '@/features/order/components/DeleteOrderButton';
import { UpdateOrderFormButton } from '@/features/order/components/UpdateOrderForm';
import { Order } from '@/features/order/types';

export interface OrdersTable {
  clientId: string;
  orders: Order[];
  onOrderUpdated: (order: Order) => void;
  onOrderDeleted: (order: Order) => void;
  onOrderCreated: (order: Order) => void;
}

export const OrdersTable: React.FC<OrdersTable> = memo((props) => {
  const { clientId, orders, onOrderDeleted, onOrderUpdated, onOrderCreated } = props;
  return (
    <TableContainer component={Paper} sx={{ tableLayout: 'fixed' }}>
      <Table sx={{ overflow: 'hidden' }}>
        <TableHead>
          <TableRow>
            <TableCell colSpan={3} valign="middle">
              <Typography component="span">Orders</Typography>{' '}
              <CreateOrderFormButton clientId={clientId} onClientCreated={onOrderCreated} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Order Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell sx={{ maxWidth: 100 }} className="truncate">
                {order.id}
              </TableCell>
              <TableCell className="truncate">{order.name}</TableCell>
              <TableCell className="truncate">
                <UpdateOrderFormButton order={order} onOrderUpdated={onOrderUpdated} />
                <DeleteOrderButton orderId={order.id} onOrderDeleted={onOrderDeleted} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default OrdersTable;
