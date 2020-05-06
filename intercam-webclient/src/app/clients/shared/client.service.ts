import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Client } from './client.model';
import { ClientPage } from './client-page.model';

@Injectable()
export class ClientService {
  constructor(private http: HttpClient) {}

  getAll(params?: HttpParams) {
    return this.http.get<ClientPage>('/api/client', { params });
  }

  getById(id: string) {
    return this.http.get<Client>(`/api/client/${id}`);
  }

  delete(id: number) {
    return this.http.delete<void>(`/api/client/${id}`);
  }

  create(client: Client) {
    return this.http.post<Client>('/api/client', client);
  }

  update(id: string, client: Client) {
    return this.http.put<Client>(`/api/client/${id}`, client);
  }
}
