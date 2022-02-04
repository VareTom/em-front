export class User {
  uuid: string;
  email: string;
  createdAt: string;

  constructor(json: any) {
    this.uuid = json.uuid; // TODO:: change id to uuid in api respoonse
    this.email = json.email;
    this.createdAt = json.createdAt;
  }
}
