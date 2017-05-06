import React, { Component } from 'react'
import TabPanel, { TabBody } from 'react-tab-panel'
import JobListingApp from './JobListingApp'
import SaveJobsListingApp from './SaveJobsListingApp'
import ManageJobsAndResponsesSearch from './ManageJobsAndResponsesSearch'

import 'react-tab-panel/index.css' //for the default look

class JobListing extends Component {
	constructor(props) {
	    super(props);
	    console.log(this.props,8129381973128937128);
	}

	render() {
		const { tab } = this.props;
		return (
			<div>
			<div className="jobListing fl">
		        <button className='postJobBtn'><b>Post Jobs</b></button>
		        <TabPanel
		          tabAlign="start"
		          transition="true"
		          onActivate={
		            //this.refreshJobListing('soccer')
			            (index) => {
			            	//console.log('Tab ' + index + ' was activated!'),
				            //this.props.activateSeletedTab(index)
				            this.props.toggleTab(index)
				        }
			          } >
 
    			        <TabBody style={
			            {
				            padding: 10,
				            overflow: 'hidden',
				            maxWidth: 850
			            }
			          }>
		            <div tabTitle="Jobs and Responses" id="JobsAndResponses">
		                <JobListingApp />
		            </div> 
		            <div tabTitle="Saved Jobs" id="SavedJobs">
		                <SaveJobsListingApp criteria={this.props.criteria}/>
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
export default JobListing;