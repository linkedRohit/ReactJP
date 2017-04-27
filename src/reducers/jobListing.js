import { combineReducers } from 'redux'
import {
  SELECT_JOBLISTING, INVALIDATE_JOBLISTING,
  REQUEST_JOBS, RECEIVE_JOBS, JOB_FETCH_ERROR
} from '../actions/jobListing'

function selectedJobListingType(state = 'all', action) {
  switch (action.type) {
  case SELECT_JOBLISTING:
    return action.joblistingType
  default:
    return state
  }
}

function jobs(state = {
  isFetching: false,
  didInvalidate: false,
  jobs: []
}, action) {
  switch (action.type) {
    case INVALIDATE_JOBLISTING:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_JOBS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_JOBS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        jobs: action.jobs,
        lastUpdated: action.receivedAt
      })
    case JOB_FETCH_ERROR:
      return Object.assign({}, state, {
        hasErrored: action.hasErrored
      })
    default:
      return state
  }
}

function jobsByJoblisting(state = { }, action) {
  //action.joblistingType = action.joblistingType ? action.joblistingType : 'all';
  switch (action.type) {
    case INVALIDATE_JOBLISTING:
    case RECEIVE_JOBS:
    case REQUEST_JOBS:
      return Object.assign({}, state, {
        [action.joblistingType]: jobs(state[action.joblistingType], action)
      })

    case JOB_FETCH_ERROR:
      console.log(action.hasErrored);
      return state;
    default:
      return state
  }
}

const jobListingReducer = combineReducers({
  jobsByJoblisting,
  selectedJobListingType
})

export default jobListingReducer
