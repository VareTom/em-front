export class Entity {
  uuid: string;
  name: string;
  description: string;
  authorUuid: string
  createdAt: string;
  //services?: Service[];
  
  // TODO:: get members (add at)
  
  constructor(json: any) {
    this.uuid = json.uuid;
    this.name = json.name;
    this.description = json.description;
    this.authorUuid = json.authorUuid;
  }
}