import { Address } from 'src/shared/models/address';

export class Client {
  uuid: string;
  firstName: string;
  lastName: string;
  options: string;
  address: Address;
  createdAt: string;
  
  constructor(json: any) {
    this.uuid = json.uuid;
    this.firstName = json.firstName;
    this.lastName = json.lastName;
    this.options = json.options;
    if (json.address) this.address = new Address(json.address);
    this.createdAt = json.createdAt;
  }
}