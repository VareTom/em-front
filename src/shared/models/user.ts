import { Entity } from 'src/shared/models/entity';

export class User {
  uuid: string;
  email: string;
  createdAt: string;
  entities?: Entity[] = [];

  constructor(json: any) {
    this.uuid = json.uuid;
    this.email = json.email;
    this.createdAt = json.createdAt;
    
    if (json.entities && json.entities.length > 0) {
      this.entities = json.entities.map((entity: any) => new Entity(entity));
    }
  }
}
