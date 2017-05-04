import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import jobListingReducer from './reducers/jobListing'

const loggerMiddleware = createLogger()

export default function configureStore(preloadedState) {
  return createStore(
    jobListingReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
}
