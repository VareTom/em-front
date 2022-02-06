// Models
import { User } from './shared/models/user';
import { Entity } from 'src/shared/models/entity';

export interface StoreState {
    connectedUser: User;
    currentEntity: Entity;
}