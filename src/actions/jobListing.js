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

export function selectJobType(selectedJobType) {
  return {
    type: SELECT_JOBLISTING,
    selectedJobType
  }
}

export function invalidateJobListing(selectedJobType) {
  return {
    type: INVALIDATE_JOBLISTING,
    selectedJobType
  }
}

export function jobFetchError(bool) {
  return {
    type: 'JOB_FETCH_ERROR',
    hasErrored: bool
  }
}

function requestJobs(selectedJobType) {
  return {
    type: REQUEST_JOBS,
    selectedJobType
  }
}

function receiveJobs(selectedJobType, jobs) {
  //selectedJobType = typeof selectedJobType == "undefined" ? "all" : selectedJobType;
  return {
    type: RECEIVE_JOBS,
    selectedJobType,
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

function updateScopeOfListing(selectedJobType, jobs, criteria) {
  return {
    type: UPDATE_CRITERIA,
    selectedJobType,
    jobs: jobs.data.children.map(child => child.data),
    receivedAt: Date.now(),
    criteria: [criteria]
  }
}

function fetchJobs(selectedJobType) {
  selectedJobType = selectedJobType ? selectedJobType : 'all';
  return dispatch => {
    dispatch(requestJobs(selectedJobType))
    return fetch(`https://www.reddit.com/r/${selectedJobType}.json`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;       
      })
      .then((response)=> response.json())
      .then(jobs => dispatch(receiveJobs(selectedJobType, jobs)))
      .catch((e) => dispatch(jobFetchError(e)));
  }
}

function shouldFetchJobs(state, selectedJobType) {
  const jobs = state.jobsByJoblisting[selectedJobType]
  if (!jobs) {
    return true
  } else if (jobs.isFetching) {
    return false
  } else {
    return jobs.didInvalidate
  }
}

export function fetchJobsIfNeeded(selectedJobType) {
  return (dispatch, getState) => {
    if (shouldFetchJobs(getState(), selectedJobType)) {
      return dispatch(fetchJobs(selectedJobType))
    }
  }
}

export function reloadJobListing(criteria) {
  return (dispatch, getState) => {
    return dispatch(reloadListing(criteria));
  }
}

function reloadListing(criteria) {
  //console.log(criteria);
  let selectedJobType = criteria.selectedJobType ? criteria.selectedJobType : 'all';
  let pageIndex = criteria.page ? criteria.page : DEFAULT_PAGE_INDEX;
  let jobsPerPage = criteria.jobsPerPage ? criteria.jobsPerPage : DEFAULT_JOB_COUNT;
  let userFilter = criteria.userFilter ? criteria.userFilter : DEFAULT_SELECTED_USER;
  let jobStatusFilter = criteria.jobStatusFilter ? criteria.jobStatusFilter : DEFAULT_JOB_STATUS;

  let jobListingAPIUrl = `https://www.reddit.com/r/`;
  let jobListingAPIResourceUrl = jobListingAPIUrl + (selectedJobType ? selectedJobType : 'all') + '.json';

  jobListingAPIResourceUrl += '?after=t3_68voeh&p=' + pageIndex + '&jobsPerPage=' + jobsPerPage + '&userFilter=' + userFilter + '&jobStatusFilter=' + jobStatusFilter;

  return dispatch => {
    dispatch(requestJobs(selectedJobType))
    return fetch(jobListingAPIResourceUrl)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;       
      })
      .then((response)=> response.json())
      .then(jobs => dispatch(updateScopeOfListing(selectedJobType, jobs, criteria)))
      .catch((e) => dispatch(jobFetchError(e)));
  }
}