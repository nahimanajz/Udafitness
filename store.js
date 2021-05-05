import {createStore} from 'react'
import Reducer from '../reducers/reducer'

const configureStore = ()=> {
    const store = createStore(Reducer);
    store.subscribe(()=>{
        localStorage.state = JSON.stringify(store.getState());
    });
    return store;
}
export default configureStore;
