import { Action } from "@ngrx/store";
import { CounterActionTypes, Update } from './../actions/couter.actions';

export const INITIAL_STATE = 0;

export function counterReducer(state = INITIAL_STATE, action: Action): number {
    switch(action.type) {
        case CounterActionTypes.Increment:
            return state + 1;
        case CounterActionTypes.Decrement:
            return state - 1;
        case CounterActionTypes.Reset:
            return 0;
        case CounterActionTypes.Update:
            return (action as Update).value; // typed to {}
        default:
            return state;
    }
}