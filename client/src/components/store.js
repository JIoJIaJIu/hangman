import { injectReducer } from '../store/reducers'
import userReducer from './User/redux/reducer'

export default function initStores(store) {
  injectReducer(store, {key:'auth', reducer: userReducer}); 
}
