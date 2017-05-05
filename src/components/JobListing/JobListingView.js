import React, { Component, PropTypes } from 'react'
import { selectedJobListingType, fetchJobsIfNeeded, invalidateJobListing } from '../../actions/jobListing'
import { connect } from 'react-redux'
import TabPanel, { TabBody, TabStrip } from 'react-tab-panel'
import JobListingApp from './JobListingApp'
import SaveJobsListingApp from './SaveJobsListingApp'
import ManageJobsAndResponsesSearch from './ManageJobsAndResponsesSearch'

import 'react-tab-panel/index.css' //for the default look

class JobListingView extends Component {
	constructor(props) {
	    super(props);
	}

	render() {
		return (
			<div>
			<div className="jobListing fl">
		        <button className='postJobBtn'><b>Post Jobs</b></button>
		        <TabPanel
		          tabAlign = "start"
		          transition = "true"
		          onActivate = {
		            //this.refreshJobListing('soccer')
		            (index) => console.log('Tab ' + index + ' was activated!')
		            //this.props.activateSeletedTab(index)
		            //this.refreshJobListing('soccer')
		          } >

		          <TabBody style = {
		            {
		             padding: 10,
		             overflow: 'hidden',
		             maxWidth: 850
		            }
		          }>
		            <div tabTitle = "Jobs and Responses" id = "JobsAndResponses">
		                <JobListingApp updateJobType={this.props.updateJobType}/>
		            </div> 
		            <div tabTitle = "Saved Jobs" id = "SavedJobs">
		                <SaveJobsListingApp updateJobType={this.props.updateJobType}/>
		            </div>
		          </TabBody>
		        </TabPanel>
		    </div>
		    <div id="searchMenu" className="searchMenu">
		    	<ManageJobsAndResponsesSearch />
		    </div>
		    </div>
		)
	}
}

JobListingView.propTypes = {
	updateJobType: PropTypes.func.isRequired
};

export default JobListingView;