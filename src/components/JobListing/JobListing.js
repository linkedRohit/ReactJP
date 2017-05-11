import React, { Component, PropTypes } from 'react'
import TabPanel, { TabBody } from 'react-tab-panel'
import JobListingApp from './JobListingApp'
import SaveJobsListingApp from './SaveJobsListingApp'
//import ManageJobsAndResponsesSearch from './ManageJobsAndResponsesSearch'
import SearchFormContainer from '../Search/SearchFormContainer'
import 'react-tab-panel/index.css' //for the default look
import Notifications from 'react-notification-system-redux';

class JobListing extends Component {
	constructor(props) {
	    super(props);	    
	}

	render() {
		const { toggleTab, notification } = this.props;
		
		return (
			<div>
				<div className="jobListing fl">
			        <button className='postJobBtn'><b>Post Jobs</b></button>
			        <TabPanel
				        tabAlign="start"
				        transition="true"
				        onActivate={
				            (index) => { let a = index ? 'meditation': 'all'; toggleTab(a) }
				        } >
	 
				        <TabBody style={{
				            padding: 10,
				            overflow: 'hidden',
				            maxWidth: 850
			            }}>
			            <div tabTitle="Jobs and Responses" id="JobsAndResponses">
			                <JobListingApp criteria={this.props.criteria} loadPage={this.props.loadPage} notification={notification}/>
			            </div> 
			            <div tabTitle="Saved Jobs" id="SavedJobs">
			                <SaveJobsListingApp criteria={this.props.criteria} loadPage={this.props.loadPage} notification={notification}/>
			            </div>			            
			          </TabBody>
			        </TabPanel>
			    </div>
			    <div id="searchMenu" className="searchMenu">
			    	<SearchFormContainer />
			    </div>
		    </div>
		)
	}
}

JobListing.propTypes = {
	notifications: PropTypes.array
}

export default JobListing;