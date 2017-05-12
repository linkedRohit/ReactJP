import React, { Component, PropTypes } from 'react'
import TabPanel, { TabBody } from 'react-tab-panel'
import JobListingApp from './JobListingApp'
import SaveJobsListingApp from './SaveJobsListingApp'
//import ManageJobsAndResponsesSearch from './ManageJobsAndResponsesSearch'
import SearchFormComponent from '../../components/Search/SearchFormComponent'
import 'react-tab-panel/index.css' //for the default look
import Notifications from 'react-notification-system-redux';

class JobListing extends Component {
	constructor(props) {
	    super(props);	    
	}

	render() {
		const { toggleTab, notification, loadPage, criteria, search } = this.props;
		
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
			                <JobListingApp criteria={criteria} loadPage={loadPage} notification={notification} />
			            </div> 
			            <div tabTitle="Saved Jobs" id="SavedJobs">
			                <SaveJobsListingApp criteria={criteria} loadPage={loadPage} notification={notification} />
			            </div>			            
			          </TabBody>
			        </TabPanel>
			    </div>
			    <div className="searchAndManageBox">   
				    <div id="searchMenu" className="searchMenu">
				    	{search.showSearchWidget && <SearchFormComponent search={search}/>}
				    </div>
				    {search.showAccountWidget && <div>
					    	<div className="searchHeader mt20">Account Utilization</div>
						    <div style={{ border: '1px solid #999'}}>
						        <div><div className="accountUtilization mt10">
						          <div><strong>Hot Vacancy :</strong> 342 left</div>
						          <div><strong>Classified :</strong> 38 left</div>
						          </div>
						        </div>
					        </div>
				        </div>
				    }
			        {search.showManageDupWidget && <div>
			        		<div className="searchHeader mt20">Manage Duplicates</div>
					        <div style={{ border: '1px solid #999'}}>
					        	<div className="manageDuplicate mt10">
					          		<div>Block duplicate applies across eapps jobs <img alt='Help text' src="../img/info.png" height='10px'/><br/><a href="#">Manage</a></div>
					        	</div>
					        </div>
				        </div>
				    }
		        </div>
		    </div>
		)
	}
}

JobListing.propTypes = {
	notifications: PropTypes.array,
	criteria: PropTypes.object,
	loadPage: PropTypes.func,
	search: PropTypes.object
}

export default JobListing;