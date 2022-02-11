export class Expenditure {
  uuid: string;
  name: string;
  priceInCent: number;
  boughtAt: string;
  createdAt: string;
  
  constructor(json: any) {
    this.uuid = json.uuid;
    this.name = json.name;
    this.priceInCent = json.priceInCent;
    this.boughtAt = json.boughtAt;
    this.createdAt = json.createdAt;
  }
}