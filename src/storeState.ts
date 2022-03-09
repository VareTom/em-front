// Models
import { User } from './shared/models/user';
import { Entity } from 'src/shared/models/entity';
import { NbMenuItem } from '@nebular/theme';

export interface StoreState {
    connectedUser: User;
    currentEntity: Entity;
    menuItems: NbMenuItem[];
}
