import { Client } from 'src/shared/models/client';
import { Service } from 'src/shared/models/service';

export class Order {
  uuid: string;
  duration: number;
  totalInCent: number;
  performedAt: string;
  validatedAt: string;
  createdAt: string;
  
  client: Client;
  services: Service[];
  
  constructor(json: any) {
    this.uuid = json.uuid;
    this.duration = json.durationInMinute;
    this.totalInCent = json.totalInCent;
    this.createdAt = json.createdAt;
    this.performedAt = json.performedAt;
    this.validatedAt = json.validatedAt;
    
    if (json.client) this.client = new Client(json.client);
    if (json.services) this.services = json.services.map((service: any) => new Service(service));
  }
}