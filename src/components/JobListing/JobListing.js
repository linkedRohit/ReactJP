import React, { Component } from 'react'
import TabPanel, { TabBody } from 'react-tab-panel'
import JobListingApp from './JobListingApp'
import SaveJobsListingApp from './SaveJobsListingApp'
import ManageJobsAndResponsesSearch from './ManageJobsAndResponsesSearch'
import Pagination from 'react-js-pagination'


import 'react-tab-panel/index.css' //for the default look

class JobListing extends Component {
	constructor(props) {
	    super(props);	    
	}

	render() {
		const { toggleTab, loadPage } = this.props;
		console.log(this.props.criteria,981293812);
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
			                <JobListingApp criteria = {this.props.criteria} />
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
			    <Pagination prevPageText='Previous' nextPageText='Next' firstPageText='First' lastPageText='Last'
      				pageRangeDisplayed={5} activePage={this.props.criteria.pageIndex} itemsCountPerPage={this.props.criteria.jobsPerPage} totalItemsCount={1000}
      				onChange={
      					(index) => { var a = index ? index : 1; loadPage(a) }
      				} />
			    
		    </div>
		)
	}
}
export default JobListing;