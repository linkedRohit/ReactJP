import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import jobListingReducer from './reducers/jobListing'
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic, rootReducer } from './actions/Epics/JobListing';

//import searchReducer from './reducers/search'
//const epicMiddleware = createEpicMiddleware(rootEpic);
const loggerMiddleware = createLogger()

export default function configureStore(preloadedState) {
  return createStore(
    jobListingReducer,
    //searchReducer,
    preloadedState,
    applyMiddleware(
  //    epicMiddleware,
      loggerMiddleware,
      thunkMiddleware
    )
  )
}
