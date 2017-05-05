import { combineReducers } from 'redux'
import {
  SELECT_JOBLISTING, INVALIDATE_JOBLISTING,
  REQUEST_JOBS, RECEIVE_JOBS, JOB_FETCH_ERROR, UPDATE_JOB_TYPE
} from '../actions/jobListing'

const ALL = 'all';

function selectJobType(state='all', action) {
  switch (action.type) {
  case SELECT_JOBLISTING:
    return action.selectedJobType
  default:
    return state
  }
}

function jobs(state = {
  isFetching: false,
  didInvalidate: false,
  jobs: [],
  selectedJobType: ALL
}, action) {
  let jobType;
  if (typeof action.selectedJobType != "undefined") {
    jobType = action.selectedJobType
  } else {
    jobType = ALL
  }
  switch (action.type) {
    case INVALIDATE_JOBLISTING:
      return Object.assign({}, state, {
        didInvalidate: true,
        selectJobType: jobType
      })
    case REQUEST_JOBS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
        selectJobType: jobType
      })
    case RECEIVE_JOBS:

      var newState = Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        jobs: action.jobs,
        lastUpdated: action.receivedAt,
        selectJobType: jobType
      });
      return newState;
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
    case UPDATE_JOB_TYPE:
      return Object.assign({}, state, {
        [action.selectJobType]: jobs(state[action.selectJobType], action)
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
  selectJobType
})

export default jobListingReducer
