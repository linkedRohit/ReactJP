import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import ManageJobsAndResponsesMenu from './ManageJobsAndResponsesMenu'
import ManageJobsAndResponsesSearch from './ManageJobsAndResponsesSearch'

render(
  <ManageJobsAndResponsesMenu />,
  document.getElementById('jobListingApp')
)

render(
  <ManageJobsAndResponsesSearch />,
  document.getElementById('searchMenu')
)
