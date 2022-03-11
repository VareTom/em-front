import { Entity } from 'src/shared/models/entity';

export class User {
  uuid: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  isSuperAdmin: boolean;
  isConfirmed: boolean;
  isDisabled: boolean;
  entity?: Entity;

  constructor(json: any) {
    this.uuid = json.uuid;
    this.email = json.email;
    this.createdAt = json.createdAt;
    this.updatedAt = json.updatedAt;
    this.deletedAt = json.deletedAt;
    this.isSuperAdmin = json.isSuperAdmin;
    this.isConfirmed = json.isConfirmed;
    this.isDisabled = json.isDisabled;

    if (json.entity) {
      this.entity = new Entity(json.entity);
    }
  }
}
