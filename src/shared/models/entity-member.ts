export class EntityMember {
  email: string;
  addAt: string;
  isAdmin: boolean;
  uuid: string;
  
  constructor(json: any) {
    this.email = json.email;
    this.addAt = json.addAt;
    this.isAdmin = json.isAdmin;
    this.uuid = json.uuid;
  }
}