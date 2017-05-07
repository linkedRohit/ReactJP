import fetch from 'isomorphic-fetch'

export const REQUEST_JOBS = 'REQUEST_JOBS'
export const RECEIVE_JOBS = 'RECEIVE_JOBS'
export const SELECT_JOBLISTING = 'SELECT_JOBLISTING'
export const INVALIDATE_JOBLISTING = 'INVALIDATE_JOBLISTING'
export const JOB_FETCH_ERROR = 'JOB_FETCH_ERROR'
export const UPDATE_JOB_TYPE = 'UPDATE_JOB_TYPE'
export const UPDATE_CRITERIA = 'UPDATE_CRITERIA'
export const TOGGLE_TAB = 'TOGGLE_TAB'

const DEFAULT_JOB_COUNT = 20;
const DEFAULT_PAGE_INDEX = 1;
const DEFAULT_SELECTED_USER = 'ALL';
const DEFAULT_JOB_STATUS = 'ALL';

export function selectedJobType(jobType) {
  return {
    type: SELECT_JOBLISTING,
    jobType
  }
}

export function invalidateJobListing(jobType) {
  return {
    type: INVALIDATE_JOBLISTING,
    jobType
  }
}

export function jobFetchError(bool) {
  return {
    type: 'JOB_FETCH_ERROR',
    hasErrored: bool
  }
}

function requestJobs(jobType) {
  return {
    type: REQUEST_JOBS,
    jobType
  }
}

export function updateCriteria(criteria) {
  return {
    type: UPDATE_CRITERIA,
    criteria
  }
}

function receiveJobs(jobType, jobs) {
  //jobType = typeof jobType == "undefined" ? "all" : jobType;
  return {
    type: RECEIVE_JOBS,
    jobType,
    jobs: jobs.data.children.map(child => child.data),
    receivedAt: Date.now()    
  }
}

export function toggleTab (index) {
  return {
    type: TOGGLE_TAB,
    paload: index ? 'savedJobs' : 'all'
  }
}

function fetchJobs(jobType) {
  jobType = jobType ? jobType : 'all';
  return dispatch => {
    dispatch(requestJobs(jobType))
    return fetch(`https://www.reddit.com/r/${jobType}.json`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;       
      })
      .then((response)=> response.json())
      .then(jobs => dispatch(receiveJobs(jobType, jobs)))
      .catch((e) => dispatch(jobFetchError(e)));
  }
}

function shouldFetchJobs(state, jobType) {
  const jobs = state.jobsByJoblisting[jobType]
  if (!jobs) {
    return true
  } else if (jobs.isFetching) {
    return false
  } else {
    return jobs.didInvalidate
  }
}

export function fetchJobsIfNeeded(jobType) {
  return (dispatch, getState) => {
    if (shouldFetchJobs(getState(), jobType)) {
      return dispatch(fetchJobs(jobType))
    }
  }
}

export function reloadJobListing(criteria) {
  return (dispatch, getState) => {
    return dispatch(reloadListing(criteria));
  }
}

function reloadListing(criteria) {
  let jobListingAPIUrl = `https://www.reddit.com/r/`;
  let jobListingAPIResourceUrl = jobListingAPIUrl + (criteria.jobType) + '.json';

  jobListingAPIResourceUrl += '?p=' + criteria.pageIndex + '&jobsPerPage=' + criteria.jobsPerPage + '&userFilter=' + criteria.userFilter + '&jobStatusFilter=' + criteria.jobStatusFilter;

  return dispatch => {
    dispatch(requestJobs(criteria.jobType))
    return fetch(jobListingAPIResourceUrl)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;       
      })
      .then((response)=> response.json())
      .then(jobs => dispatch(receiveJobs(criteria.jobType, jobs, criteria)))
      .catch((e) => dispatch(jobFetchError(e)));
  }
}