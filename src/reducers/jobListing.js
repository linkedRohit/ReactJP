import { combineReducers } from 'redux'
import {
  SELECT_JOBLISTING, INVALIDATE_JOBLISTING,
  REQUEST_JOBS, RECEIVE_JOBS, JOB_FETCH_ERROR, UPDATE_CRITERIA, TOGGLE_TAB
} from '../actions/jobListing'

const ALL = 'all';
const DEFAULT_JOB_COUNT = 20;
const DEFAULT_PAGE_INDEX = 1;
const DEFAULT_SELECTED_USER = 'ALL';
const DEFAULT_JOB_STATUS = 'ALL';


function selectJobType(state='all', action) {
  switch (action.type) {
  case SELECT_JOBLISTING:
    return action.selectedJobType
  default:
    return state
  }
}

const INITIAL_STATE = {
  isFetching: false,
  didInvalidate: false,
  jobs: [],
  selectedJobType: ALL,
  criteria: [{'pageIndex':DEFAULT_PAGE_INDEX, 'jobsPerPage': DEFAULT_JOB_COUNT, 'userFilter': DEFAULT_SELECTED_USER, 'jobStatusFilter': DEFAULT_JOB_STATUS}]
}

function processJobListing(state = {
  INITIAL_STATE
}, action) {
  let jobType;
  if (typeof action.selectedJobType !== "undefined") {
    jobType = action.selectedJobType
  } else {
    jobType = ALL
  }
  switch (action.type) {
    case TOGGLE_TAB:
      return Object.assign({}, state, {
        didInvalidate: true,
        tab: action.payload ? 'savedJobs' : 'all'
      })
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
    case UPDATE_CRITERIA:
      return Object.assign({}, state, {
        criteria: action.criteria ? action.criteria[0] : INITIAL_STATE
      });
    case JOB_FETCH_ERROR:
      return Object.assign({}, state, {
        hasErrored: action.hasErrored
      });
    default:
      return state
  }
}

function jobsByJoblisting(state = { }, action) {
  switch (action.type) {
    case TOGGLE_TAB:
    case INVALIDATE_JOBLISTING:
    case RECEIVE_JOBS:
    case REQUEST_JOBS:
      return Object.assign({}, state, {
        [action.selectJobType]: processJobListing(state[action.selectJobType], action)
      })
    case UPDATE_CRITERIA:
      return Object.assign({}, state, {
        [action.Criteria]: processJobListing(state[action.selectJobType], action)
      })
    case JOB_FETCH_ERROR:
      console.log(action.hasErrored);
      return state;
    default:
      return state;
  }
}

function Criteria(state = {}, action) {
  switch (action.type) {
    case UPDATE_CRITERIA:
      //return Object.assign({}, state, {
        //[action.selectJobType]: processJobListing(state[action.criteria], action)
      //})
      return processJobListing(state, action)
    default:
      return state;
  }
}

const jobListingReducer = combineReducers({
  jobsByJoblisting,
  selectJobType,
  Criteria
})

export default jobListingReducer
