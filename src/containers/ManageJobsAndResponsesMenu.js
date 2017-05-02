import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TabPanel, { TabBody, TabStrip } from 'react-tab-panel'
import JobListingApp from './JobListingApp'
import SaveJobsListingApp from './SaveJobsListingApp'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'

const store = configureStore()
 
//now import the css files
import 'react-tab-panel/index.css' //for the default look

class ManageJobsAndResponsesMenu extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    //const { selectedJobType, jobs, isFetching, lastUpdated } = this.props
    return (
      <div className="jobListing fl">
        <button className='postJobBtn'><b>Post Jobs</b></button>
        <TabPanel
          tabAlign = "start"
          transition = "true"
          onActivate = {
            //this.refreshJobListing('soccer')
            (index) => console.log('Tab ' + index + ' was activated!')
            //this.refreshJobListing('soccer')
          } >

          <TabBody style = {
            {
             padding: 10,
             overflow: 'hidden'
            }
          }>
            <div tabTitle = "Jobs and Responses" id = "JobsAndResponses" className="w90per">
                <Provider store={store}>
                  <JobListingApp selectedJobType="all"/>
                </Provider>
            </div> 
            <div tabTitle = "Saved Jobs" id = "SavedJobs" className="w90per">
                <Provider store={store}>
                  <SaveJobsListingApp selectedJobType="all"/>
                </Provider>
            </div>
          </TabBody>
        </TabPanel>
     </div>
     )
   }
}




ManageJobsAndResponsesMenu.PropTypes = {
  selectedJobType: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}


/*function mapStateToProps(state) {
  const { selectedJobType, refreshJobListing } = state
  const {
    isFetching,
    jobs: jobs
  } = refreshJobListing[selectedJobType] || {
    isFetching: true,
    jobs: []
  }

  return {
    selectedJobType,
    jobs
  }
}
*/
export default ManageJobsAndResponsesMenu;