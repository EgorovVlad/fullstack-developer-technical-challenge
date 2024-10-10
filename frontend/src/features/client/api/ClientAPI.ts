import { CreateClientPayload, UpdateClientPayload } from '@server-types/client';

import { Client } from '@/features/client/types';
import { serverApi } from '@/utils/api';

export class ClientAPI {
  static async fetchClient(id: string) {
    const response = await serverApi.get(`/clients/${id}`);
    return response.data as Client;
  }

  static async fetchClients() {
    const response = await serverApi.get('/clients');
    return response.data as Client[];
  }

  static async createClient(client: CreateClientPayload) {
    const response = await serverApi.post('/clients', client);
    return response.data as Client;
  }

  static async updateClient(id: string, client: UpdateClientPayload) {
    const response = await serverApi.put(`/clients/${id}`, client);
    return response.data as Client;
  }

  static async deleteClient(id: string) {
    const response = await serverApi.delete(`/clients/${id}`);
    return response.data as Client;
  }
}
