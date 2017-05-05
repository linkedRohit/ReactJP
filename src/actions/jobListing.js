import fetch from 'isomorphic-fetch'

export const REQUEST_JOBS = 'REQUEST_JOBS'
export const RECEIVE_JOBS = 'RECEIVE_JOBS'
export const SELECT_JOBLISTING = 'SELECT_JOBLISTING'
export const INVALIDATE_JOBLISTING = 'INVALIDATE_JOBLISTING'
export const JOB_FETCH_ERROR = 'JOB_FETCH_ERROR'
export const UPDATE_JOB_TYPE = 'UPDATE_JOB_TYPE'

export function updateJobType(selectedJobType) {
  type: UPDATE_JOB_TYPE,
  selectedJobType
}

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

function fetchJobs(selectedJobType) {
  return dispatch => {
    dispatch(requestJobs(selectedJobType))
    return fetch(`https://www.reddit.com/r/${selectedJobType ? selectedJobType : 'all'}.json`)
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
  if (typeof selectedJobType === 'undefined') {
    ///selectedJobType = 'all';
  }
  return (dispatch, getState) => {
    if (shouldFetchJobs(getState(), selectedJobType)) {
      return dispatch(fetchJobs(selectedJobType))
    }
  }
}
