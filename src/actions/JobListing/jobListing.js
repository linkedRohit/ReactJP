import fetch from 'isomorphic-fetch'

const jobListingAPIUrl = `https://www.reddit.com/r/`;
const jobListingSearchAPIUrl = `https://www.reddit.com/r/`;

export const REQUEST_JOBS = 'REQUEST_JOBS'
export const RECEIVE_JOBS = 'RECEIVE_JOBS'
export const SELECT_JOBLISTING = 'SELECT_JOBLISTING'
export const INVALIDATE_JOBLISTING = 'INVALIDATE_JOBLISTING'
export const JOB_FETCH_ERROR = 'JOB_FETCH_ERROR'
export const UPDATE_JOB_TYPE = 'UPDATE_JOB_TYPE'
export const UPDATE_CRITERIA = 'UPDATE_CRITERIA'
export const TOGGLE_TAB = 'TOGGLE_TAB'

export const SEARCH = 'SEARCH';

export function searchJob (searchCriteria) {
  return {
    type: SEARCH,
    searchCriteria
  }
}

export function selectedJobType (jobType) {
  return {
    type: SELECT_JOBLISTING,
    jobType
  }
}

export function toggleTab (selectedTab) {
  return (dispatch, getState) => {
    let criteria = getState().updatedCriteria.criteria;
    criteria.pageIndex = 1;
    dispatch(updateCriteria(criteria));
    return dispatch(selectedJobType(selectedTab));
  }
}

export function loadPage (selectedPage) {  
  return (dispatch, getState) => {
    let criteria = getState().updatedCriteria.criteria;
    if(criteria.pageIndex != selectedPage) {
      criteria.pageIndex = selectedPage ? selectedPage : 1;
      if (dispatch(updateCriteria(criteria))) {      
        return dispatch(reloadListing(criteria, getState().selectedJobType))
      }
    }
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
  return {
    type: RECEIVE_JOBS,
    jobType,
    jobs: jobs.data.children.map(child => child.data),
    receivedAt: Date.now()    
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
      return dispatch(reloadListing(getState().updatedCriteria.criteria, jobType))
    }
  }
}

export function reloadJobListing(criteria) {
  return (dispatch, getState) => {
    return dispatch(reloadListing(criteria, getState().selectedJobType));
  }
}

function reloadListing(criteria, jobTypeParam='all') {
  let jobType = jobTypeParam;//criteria.jobType ? criteria.jobType : 'all';
  let jobListingAPIResourceUrl = jobListingAPIUrl + (jobType) + '.json';
console.log(jobType, 1231231);
  jobListingAPIResourceUrl += '?p=' + criteria.pageIndex + '&jobsPerPage=' + criteria.jobsPerPage;
  if(['meditation','fnf'].indexOf(jobTypeParam) < 0) {
    jobListingAPIResourceUrl += '&userFilter=' + criteria.userFilter + '&jobStatusFilter=' + criteria.jobStatusFilter;
  }
  jobListingAPIResourceUrl += '&sortedOn=' + criteria.sortedOn + '&sortOrder=' + criteria.sortedOn;
  return dispatch => {
    dispatch(requestJobs(jobType))
    return fetch(jobListingAPIResourceUrl)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;       
      })
      .then((response)=> response.json())
      .then(jobs => dispatch(receiveJobs(jobType, jobs, criteria)))
      .catch((e) => dispatch(jobFetchError(e)));
  }
}