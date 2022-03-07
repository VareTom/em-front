export class Car {
  uuid: string;
  merch: string;
  model: string;
  plate: string;
  year?: number;
  color?: string;
  createdAt: string;
  
  constructor(json: any) {
    this.uuid = json.uuid;
    this.merch = json.merch;
    this.model = json.model;
    this.plate = json.plate;
    this.year = json.year;
    this.color = json.color;
    this.createdAt = json.createdAt;
  }
}