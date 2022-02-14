import { EntityMember } from 'src/shared/models/entity-member';

export class Entity {
  uuid: string;
  name: string;
  description: string;
  authorUuid: string
  createdAt: string;
  members?: EntityMember[] = [];
  
  constructor(json: any) {
    this.uuid = json.uuid;
    this.name = json.name;
    this.description = json.description ?? null;
    this.authorUuid = json.authorUuid;
    this.createdAt = json.createdAt;
    
    if (json.members && json.members.length > 0) this.members = json.members.map((member: any) => new EntityMember(member));
  }
}