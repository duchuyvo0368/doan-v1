import shopCartReducer from './shopCartReducer'
import { combineReducers } from 'redux'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import imageReducer from './productSlice';
import { persistReducer } from 'redux-persist';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};
const shopcartPersistConfig = {
    ...persistCommonConfig,
    key: 'shopcart',
    whitelist: ['listCartItem']
};

const imagePersistConfig = {
    ...persistCommonConfig,
    key: 'image',
    whitelist: ['imagesList'], // Persist the 'imagesList' part of the image state
};

const rootReducer = combineReducers({
    shopcart: persistReducer(shopcartPersistConfig, shopCartReducer),
    image: persistReducer(imagePersistConfig, imageReducer), 
})
export default rootReducer