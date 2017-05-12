import { combineReducers } from 'redux'
import {
  SELECT_JOBLISTING, INVALIDATE_JOBLISTING,
  REQUEST_JOBS, RECEIVE_JOBS, JOB_FETCH_ERROR, UPDATE_CRITERIA, 
  TOGGLE_TAB, RESET_SEARCH
} from '../actions/JobListing/jobListing'
//import {reducer as toastrReducer} from 'react-redux-toastr'
import {reducer as notifications} from 'react-notification-system-redux';

const ALL = 'all';
const DEFAULT_JOB_COUNT = 20;
const DEFAULT_PAGE_INDEX = 1;
const DEFAULT_SELECTED_USER = 'ALL';
const DEFAULT_JOB_STATUS = 'ALL';
const DEFAULT_SORTING_ORDER = 'ASC';
const DEFAULT_SORT_FIELD = 'postedBy';

const INITIAL_CRITERIA = {
  'jobsPerPage': DEFAULT_JOB_COUNT, 
  'pageIndex': DEFAULT_PAGE_INDEX, 
  'userFilter': DEFAULT_SELECTED_USER, 
  'jobStatusFilter': DEFAULT_JOB_STATUS, 
  'sortedOn': DEFAULT_SORT_FIELD, 
  'sortOrder': DEFAULT_SORTING_ORDER
}

const SHOW_SEARCH_ON_TABS = ['all','cricket','rugbyunion'];
const INITIAL_SEARCH = {'keyword':'','selectedKeywordType':'Position'};


function selectedJobType(state='all', action) {
  switch (action.type) {
  case SELECT_JOBLISTING:    
    return action.jobType
  default:
    return state
  }
}

function showSearch(jobType) {
  if(SHOW_SEARCH_ON_TABS.indexOf(jobType) >= 0) {
    return true;
  }
  return false;
}

function processJobListing(state = {
//  INITIAL_STATE
}, action) {
  let jobType;
  if (typeof action.jobType !== "undefined") {
    jobType = action.jobType
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
      });
    default:
      return state
  }
}

function jobsByJoblisting(state = { }, action) {
  switch (action.type) {
    case INVALIDATE_JOBLISTING:
    case RECEIVE_JOBS:
    case REQUEST_JOBS:
      return Object.assign({}, state, {
        [action.jobType]: processJobListing(state[action.jobType], action)
      })
    case JOB_FETCH_ERROR:
      console.log(action.hasErrored);
      return state;
    default:
      return state;
  }
}

function updatedCriteria(state = { 'criteria': INITIAL_CRITERIA }, action) {
  switch (action.type) {
    case UPDATE_CRITERIA:
      return Object.assign({}, state, {
        ['criteria']: action.criteria ? action.criteria : INITIAL_CRITERIA
      })
      //return processJobListing(state, action)
    default:
      return state;
  }
}

function search(state = { 'params': INITIAL_SEARCH, 'resetSearch': false }, action) {
  switch (action.type) {
    case RESET_SEARCH:
      return Object.assign({}, state, {
        resetSearch: true,
      });
    default:
      let showSearchFlag = showSearch(action.jobType);
      let showMngDupFlag = showSearchFlag;
      return Object.assign({}, state, {
        resetSearch: true,
        showSearchWidget: showSearchFlag,
        showManageDupWidget: showMngDupFlag,
        showAccountWidget: true
      });
  }
}

const jobListingReducer = combineReducers({
  jobsByJoblisting,
  selectedJobType,
  updatedCriteria,
  notifications,
  search
})

export default jobListingReducer
