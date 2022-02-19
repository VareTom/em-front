export class SelectViewModel {
  name: string;
  value: string;
  
  constructor(json: any) {
    this.name = json.name;
    this.value = json.value;
  }
}