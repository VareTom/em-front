export class Address {
  
  uuid: string;
  street: string;
  number: number;
  box?: string
  postalCode: number;
  locality: string;
  country: string;
  createdAt: string;
  
  constructor(json: any) {
    this.uuid = json.uuid;
    this.street = json.street;
    this.number = json.number;
    this.box = json.box;
    this.postalCode = json.postalCode;
    this.locality = json.locality;
    this.country = json.country;
    this.createdAt = json.createdAt;
  }
}