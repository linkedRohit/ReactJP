import React, { Component } from 'react'
import JobListingApp from './JobListingApp'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'

const store = configureStore()

export default class JobListing extends Component {
  render() {
    return (
      <Provider store={store}>
        <JobListingApp />
      </Provider>
    )
  }
}
