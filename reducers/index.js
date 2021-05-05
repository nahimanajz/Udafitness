import * as types from "../actions/index"
export const entries = (state = {}, action)=>{
    switch(action.type){
        case types.ADD_ENTRY:
          return {...state, ...action.entry } // [merge current state with new entry]
        case types.RECEIVE_ENTRIES:
          return {...state, ...action.entries }
        default :
            return state;
    }
}