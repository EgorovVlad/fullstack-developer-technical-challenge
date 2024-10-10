import { Box, CircularProgress, Container, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import ClientDetailsPage from '@/features/client/pages/ClientDetailsPage';
import ClientsPage from '@/features/client/pages/ClientsPage';
import { useClients } from '@/features/client/stores/useClients';
import { useOrders } from '@/features/order/stores/useOrders';

const App: React.FC = () => {
  const fetchClients = useClients((state) => state.fetchClients);
  const clientsLoading = useClients((state) => state.clientsLoading);

  const fetchOrders = useOrders((state) => state.fetchOrders);
  const ordersLoading = useOrders((state) => state.ordersLoading);

  useEffect(() => void fetchClients(), []);
  useEffect(() => void fetchOrders(), []);

  if (clientsLoading || ordersLoading) {
    return (
      <Box display="flex" flexDirection="column" width="100%" height="100%" alignItems="center" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <header>
        <Typography variant="h4" textAlign="center" bgcolor="info.main" color="white" p={3}>
          Fullstack {'</>'} <b>Challenge</b>
        </Typography>
      </header>
      <br />
      <Router>
        <Routes>
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/clients/:clientId" element={<ClientDetailsPage />} />
          <Route path="*" element={<Navigate to="/clients" />}></Route>
        </Routes>
      </Router>
    </Container>
  );
};

export default App;
