import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import ManageJobsAndResponsesMenu from './containers/ManageJobsAndResponsesMenu'
import ManageJobsAndResponsesSearch from './containers/ManageJobsAndResponsesSearch'
render(
  <ManageJobsAndResponsesMenu />,
  document.getElementById('jobListingApp')
)

render(
  <ManageJobsAndResponsesSearch />,
  document.getElementById('searchMenu')
)

