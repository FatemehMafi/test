import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage: storage,
  // whitelist: []
};

// middleware
const middleware = [thunk];
const persistedReducer = persistReducer(persistConfig, rootReducer);
// creating store

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

// assigning store to next wrapper
const makeStore = () => store;
//
export const wrapper = createWrapper(makeStore);
