export class User {
  uuid: string;
  email: string;
  createdAt: string;

  constructor(json: any) {
    this.uuid = json.uuid;
    this.email = json.email;
    this.createdAt = json.createdAt;
  }
}
