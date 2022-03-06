export class Entity {
  uuid: string;
  name: string;
  description: string;
  authorUuid: string
  createdAt: string;
  
  constructor(json: any) {
    this.uuid = json.uuid;
    this.name = json.name;
    this.description = json.description ?? null;
    this.authorUuid = json.authorUuid;
    this.createdAt = json.createdAt;
  }
}