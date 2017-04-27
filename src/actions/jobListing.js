import fetch from 'isomorphic-fetch'

export const REQUEST_JOBS = 'REQUEST_JOBS'
export const RECEIVE_JOBS = 'RECEIVE_JOBS'
export const SELECT_JOBLISTING = 'SELECT_JOBLISTING'
export const INVALIDATE_JOBLISTING = 'INVALIDATE_JOBLISTING'
export const JOB_FETCH_ERROR = 'JOB_FETCH_ERROR'

export function selectJobListing(joblistingType) {
  return {
    type: SELECT_JOBLISTING,
    joblistingType
  }
}

export function invalidateJobListing(joblistingType) {
  return {
    type: INVALIDATE_JOBLISTING,
    joblistingType
  }
}

export function jobFetchError(bool) {
  return {
    type: 'JOB_FETCH_ERROR',
    hasErrored: bool
  }
}

function requestJobs(joblistingType) {
  return {
    type: REQUEST_JOBS,
    joblistingType
  }
}

function receiveJobs(joblistingType, jobs) {
  return {
    type: RECEIVE_JOBS,
    joblistingType,
    jobs: jobs.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function fetchJobs(joblistingType) {
  return dispatch => {
    dispatch(requestJobs(joblistingType))
    return fetch(`https://www.reddit.com/r/${joblistingType ? joblistingType : 'reactjs'}.json`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;       
      })
      .then((response)=> response.json())
      .then(jobs => dispatch(receiveJobs(joblistingType, jobs)))
      .catch((e) => dispatch(jobFetchError(e)));
  }
}

function shouldFetchJobs(state, joblistingType) {
  const jobs = state.jobsByJoblisting[joblistingType]
  if (!jobs) {
    return true
  } else if (jobs.isFetching) {
    return false
  } else {
    return jobs.didInvalidate
  }
}

export function fetchJobsIfNeeded(joblistingType) {
  return (dispatch, getState) => {
    if (shouldFetchJobs(getState(), joblistingType)) {
      return dispatch(fetchJobs(joblistingType))
    }
  }
}
