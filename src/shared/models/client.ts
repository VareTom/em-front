import { Address } from 'src/shared/models/address';
import { Car } from 'src/shared/models/car';

export class Client {
  uuid: string;
  firstName: string;
  lastName: string;
  options: string;
  address: Address;
  cars: Car[];
  createdAt: string;
  
  constructor(json: any) {
    this.uuid = json.uuid;
    this.firstName = json.firstName;
    this.lastName = json.lastName;
    this.options = json.options;
    if (json.address) this.address = new Address(json.address);
    if (json.cars) this.cars = json.cars.map((car:any) => new Car(car))
    this.createdAt = json.createdAt;
  }
}