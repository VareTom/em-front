import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, Observable, OperatorFunction, pluck } from 'rxjs';

// Interfaces
import { StoreState } from './storeState';

const state: StoreState = {
    connectedUser: undefined,
    currentEntity: undefined
};

@Injectable()
export class Store {
    private subject = new BehaviorSubject<StoreState>(state);
    private store = this.subject.asObservable().pipe(distinctUntilChanged());
    
    get value () {
        return this.subject.value;
    }
    
    select<T> (name: string): Observable<T> {
        return this.store.pipe<T>(pluck(name) as OperatorFunction<StoreState, T>);
    }
    
    set<T> (name: string,state: any) {
        this.subject.next({
            ...this.value, [name]: state
        });
    }
}