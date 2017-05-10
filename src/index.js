import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
//import Root from './containers/Root'
import JobListingContainer from './containers/JobListing/JobListingContainer'
import { Provider } from 'react-redux'
import configureStore from './configureStore'

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);

render(
  <Provider store={store}>
    <JobListingContainer />
  </Provider>,
  document.getElementById('jobListingApp')
)


