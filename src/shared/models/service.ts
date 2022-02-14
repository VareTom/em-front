export class Service {
  uuid: string;
  name: string;
  description?: string;
  code: string;
  priceInCent: number;
  createdAt: string;
  
  constructor(json: any) {
    this.uuid = json.uuid;
    this.name = json.name;
    this.description = json.description;
    this.code = json.code;
    this.priceInCent = json.priceInCent;
    this.createdAt = json.createdAt;
  }
}