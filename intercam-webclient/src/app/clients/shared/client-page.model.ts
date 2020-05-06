import { Client } from './client.model';

export interface ClientPage {

  clientList: Client[];
  totalPages: number;
  totalElements: number;

}
