import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';

import { ajax } from 'rxjs/observable/dom/ajax';

const FETCH_USER = 'FETCH_USER';
const FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED';

const fetchUser = username => ({ type: FETCH_USER, payload: username });
const fetchUserFulfilled = payload => ({ type: FETCH_USER_FULFILLED, payload });

const fetchUserEpic = action$ =>
  action$.ofType(FETCH_USER)
    .mergeMap(action =>
      ajax.getJSON(`https://api.github.com/users/${action.payload}`)
        .map(response => fetchUserFulfilled(response))
    );

const users = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER_FULFILLED:
      return {
        ...state,
        // `login` is the username
        [action.payload.login]: action.payload
      };

    default:
      return state;
  }
};

import { merge } from 'rxjs/observable/merge';

export const rootEpic = combineEpics(
  fetchUserEpic
);

export const rootReducer = combineReducers({
  users
});


/*import { ajax } from 'rxjs/observable/dom/ajax';

// action creators
const requestJobs = username => ({ type: REQUEST_JOBS, payload: username });
const receiveJObs = payload => ({ type: RECEIVE_JOBS, payload });

// epic
const fetchJobsEpic = action$ =>
  action$.ofType(REQUEST_JOBS)
    .mergeMap(action =>
      ajax.getJSON(`https://api.github.com/users/${action.payload}`)
        .map(response => receiveJObs(response))
    );

// later...
dispatch(requestJobs('torvalds'));*/