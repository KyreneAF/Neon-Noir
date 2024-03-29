import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import songReducer from "./song";
import commentReducer from "./comment";
import audioReducer from "./audioPlayer";
import likedSongReducer from "./likedSong";

const rootReducer = combineReducers({
  session: sessionReducer,
  song: songReducer,
  comment: commentReducer,
  audio: audioReducer,
  likedSong: likedSongReducer,
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
