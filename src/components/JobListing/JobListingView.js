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
	    this.getJobsForListing= this.getJobsForListing.bind(this);
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
		             overflow: 'hidden'
		            }
		          }>
		            <div tabTitle = "Jobs and Responses" id = "JobsAndResponses">
		                <JobListingApp selectedJobType="all"/>
		            </div> 
		            <div tabTitle = "Saved Jobs" id = "SavedJobs">
		                <SaveJobsListingApp selectedJobType="all"/>
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

	getJobsForListing(e) {
		e.preventDefault();
        this.props.getJobsForListing(this.jobType.value);
    }
}

JobListingView.propTypes = {
	getJobsForListing: PropTypes.func.isRequired
};

export default JobListingView;