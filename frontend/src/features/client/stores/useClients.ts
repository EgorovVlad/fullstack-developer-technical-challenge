import { create } from 'zustand';

import { ClientAPI } from '@/features/client/api/ClientAPI';
import { Client } from '@/features/client/types';
import { InferZustandParams } from '@/types';

export const useClients = create((...args: unknown[]) => {
  const [set, get] = args as InferZustandParams<typeof useClients>;
  return {
    clients: [] as Client[],
    clientsLoading: false,
    fetchClients: async () => {
      set({ clientsLoading: true });
      const clients = await ClientAPI.fetchClients();
      set({ clients, clientsLoading: false });
    },
    getClientById: (clientId: string) => {
      return get().clients.find((storeClient) => storeClient.id === clientId);
    },
    addClient: (client: Client) => {
      return set((state) => ({ clients: [...state.clients, client] }));
    },
    removeClient: (client: Client) => {
      return set((state) => ({ clients: state.clients.filter((storeClient) => storeClient.id !== client.id) }));
    },
    updateClient: (client: Client) => {
      return set((state) => ({
        clients: state.clients.map((storeClient) => (storeClient.id === client.id ? client : storeClient)),
      }));
    },
  };
});
