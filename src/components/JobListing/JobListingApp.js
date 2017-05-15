import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { resetSearch, loadPage, updateCriteria, selectedJobType, 
  fetchJobsIfNeeded, invalidateJobListing, reloadJobListing } 
  from '../../actions/JobListing/jobListing'
  
import { notifyUser } from '../../actions/Generic/NotificationActions'
import Picker from '../Generic/Picker'
import Jobs from './Jobs'
import Pagination from 'react-js-pagination'
import { WARNING } from '../../Constants'

import Notifications from 'react-notification-system-redux';

class JobListingApp extends Component {

  constructor(props) {
    super(props)
    this.selectedListingTab = 'all';
    this.criteria = this.props.criteria;
    this.fetchJobsOfType = this.fetchJobsOfType.bind(this);
    this.loadJobsPerPage = this.loadJobsPerPage.bind(this);
    this.loadUserJobs = this.loadUserJobs.bind(this);
    this.displayOptions = {'order':'DESC', 'showResponses':true};
    //this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    //console.log('mount')
    const { dispatch, selectedJobType, criteria } = this.props;
    //dispatch(updateCriteria(criteria));
    this.requests = [];
    this.requests.push(
      dispatch(fetchJobsIfNeeded(selectedJobType))
    );
  //dispatch(fetchJobsIfNeeded(selectedJobType));
  }

  componentDidUpdate(prevProps) {
      //console.log('update')
      const { dispatch, selectedJobType } = this.props;
      if (this.props.selectedJobType !== prevProps.selectedJobType) {
        dispatch(fetchJobsIfNeeded(selectedJobType));
      }
  }

  componentWillUnmount() {
    console.log(this.requests);
    //console.log('unmount')
      //this.prevPromise.abort();
      //this.requests.forEach(request => request.abort());
  }

  componentWillReceiveProps(prevProps) {
    //console.log('props')
      if(this.props.jobs && this.props.jobs.length != 0) {
        let notificationObj=this.createNotificationForNoJobs();
        //dispatch(notifyUser(notificationObj));
      }
  }

  createNotificationForNoJobs() {
    let notification = {};
    notification.title = 'No Data found!';
    notification.message = 'No jobs are found for the criteria!';
    //notification.type = WARNING;
    return notification;
  }

  /*handleClick() {
    const { dispatch } = this.props;
    dispatch(Notifications.success(notificationOpts));
  }*/

  fetchJobsOfType(e) {
    e.preventDefault()
    let jobType = e.target.dataset.type;
    const { dispatch, criteria } = this.props;
    if(jobType === "refresh") {
      jobType = this.selectedListingTab ? this.selectedListingTab : 'all';
      criteria.isRefresh = true;
    } else {
      this.selectedListingTab = jobType;
      criteria.isRefresh = false;
    }
    criteria.jobType = jobType;

    dispatch(resetSearch());
    dispatch(updateCriteria(criteria));
    dispatch(selectedJobType(jobType));
    dispatch(invalidateJobListing(jobType));
    dispatch(fetchJobsIfNeeded(jobType));
  }

  operation() {
    console.log(123);
  }

  loadUserJobs(user) {
    const { criteria } = this.props;
    criteria.userFilter = user;
    this.updateJobListingView(criteria);
  }
  
  loadJobsPerPage(jobShowCount) {
    const { criteria } = this.props;
    criteria.jobsPerPage = parseInt(jobShowCount);
    this.updateJobListingView(criteria);
  }

  updateJobListingView(criteria) {
    const { dispatch } = this.props;
    dispatch(updateCriteria(criteria));
    dispatch(reloadJobListing(criteria));
    dispatch(notifyUser(null));
  }

  render() {
    const { selectedPage, responses, menuOption, jobs, isFetching, lastUpdated, criteria, loadPage, notification } = this.props;
    console.log(this.props,12312093120931203);
    const style = {
        NotificationItem: { // Override the notification item
          DefaultStyle: { // Applied to every notification, regardless of the notification level
            margin: '10px 5px 2px 1px'
          },

          success: { // Applied only to the success notification item
            color: '#026102'
          },

          warning: {
            color: 'orange'
          },

          error: {
            color: 'red'
          },

          info: {
            color: 'blue'
          }
        }
      };
    let selectedUser, jobsPerPage;
    this.criteria = criteria;
    jobsPerPage = typeof criteria !== "undefined" ? criteria.jobsPerPage : '';

    let ths = this;

    let isRefresh = (this.props.criteria && this.props.criteria.isRefresh) ? this.props.criteria.isRefresh : false;
    /*let menuSubtabs = ""
    if(menuOption.showSubTabs) {
        for (var i=0; i < menuOption.subTabs.length; i++) {
            menuSubtabs += "<a href='#' data-type=menuOption.subTabs[i].key style={{ border: 0 }} onClick={this.fetchJobsOfType}> menuOption.subTabs[i].label</a>";
        }
    }*/
    return (
      <div> 
        <Notifications
              notifications={notification}
              style={style}
          />
          <div className="opLinks">
            {selectedPage != "all" && <a href='#' data-type="all" onClick={this.fetchJobsOfType}>All Jobs</a>}
            {selectedPage == "all" && <a href='#' data-type="all" ><strong>All Jobs</strong></a>}
            
            {selectedPage != "cricket" && <a href='#' data-type="cricket" onClick={this.fetchJobsOfType}>eApps Jobs</a>}
            {selectedPage == "cricket" && <a href='#' data-type="cricket"><strong>eApps Jobs</strong></a>}

            {selectedPage != "politics" && <a href='#' data-type="politics" onClick={this.fetchJobsOfType}>Other Media Jobs</a>}
            {selectedPage == "politics" && <a href='#' data-type="politics"><strong>Other Media Jobs</strong></a>}

            {selectedPage != "rugbyunion" && <a href='#' data-type="rugbyunion" onClick={this.fetchJobsOfType}>Email (Eapps)</a>}
            {selectedPage == "rugbyunion" && <a href='#' data-type="rugbyunion"><strong>Email (Eapps)</strong></a>}

            {selectedPage != "soccer" && <a href='#' data-type="soccer" onClick={this.fetchJobsOfType}>Career Site Manager</a>}
            {selectedPage == "soccer" && <a href='#' data-type="soccer"><strong>Career Site Manager</strong></a>}

            {selectedPage != "golf" && <a href='#' data-type="golf" style={{ border: 0 }} onClick={this.fetchJobsOfType}>Email (CSM)</a>}
            {selectedPage == "golf" && <a href='#' data-type="golf" style={{ border: 0 }} ><strong>Email (CSM)</strong></a>}

          </div>
          {menuOption.showOperations && <p className="opButtons pb10 bbDark">
                  <input type="checkbox" name="jobId[]" value='all'/>
                  <input type="button" value="Refresh" onClick={this.operation.bind(null)} />
                  <input type="button" value="Share" onClick={this.operation.bind(null)} />
                  <input type="button" value="Unshare" onClick={this.operation.bind(null)} />
                  <input type="button" value="Remove" onClick={this.operation.bind(null)} />
                  <input type="button" value="Invite Referrals" onClick={this.operation.bind(null)} />
                  <strong className="ml50">Posted By </strong> <Picker value={selectedUser} onChange={this.loadUserJobs} options={[ 'All', 'You', 'Others' ]} />
                  <strong className="ml15">Status </strong> <Picker onChange={this.loadDifferentJobs} options={[ 'All Jobs', 'Active', 'Inactive', 'Shared', 'Unshared' ]} />
                  <strong className="ml15">Show </strong> <Picker value={jobsPerPage} onChange={this.loadJobsPerPage} options={[ 20, 30, 40, 50, 100, 150 ]} /> per page
              </p>
          }   
          {menuOption.showSubTabs && <div className="opLinks mt10"> 
            { menuOption.subTabs.map(function(object, i) { 
                let styleProp = (i==menuOption.subTabs.length-1) ? {border: 0} : {};

                  if(ths.selectedListingTab == object.key){
                    return <a href='#' key={object.key} data-type={object.key} style={styleProp}><strong>{object.label}</strong></a>
                  } else {           
                    return <a href='#' key={object.key} data-type={object.key} onClick={ths.fetchJobsOfType} style={styleProp}> {object.label}</a>
                  }
                  
                }
            )}
            </div>}
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href='#' data-type="refresh"
               onClick={this.fetchJobsOfType.bind(null)}>
              Refresh
            </a>
          }
        </p>
        {isFetching && typeof jobs === "undefined" &&          
          <div className="jobListLoading"></div>
        }
        {!isFetching && typeof jobs === "undefined" &&
          <h2>Empty.</h2>
        }
        {typeof jobs !== "undefined"&&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <ul className="jobListingHeader">
              <li>
                <div style={{ width : '300px' }}><h3><a href="#">Job Title</a></h3></div>
                <div style={{ width: '95px' }}></div>
                <div style={{ width: '150px' }}><h3><a href="#">Posted By</a></h3></div>
                <div style={{ width: '150px', margin: 2 }}><span><h3 style={{ marginBottom: 1}}><a href="#">Posted On  
                  <span className="ml5">
                    {this.displayOptions.order == "ASC" && <img id="id_postdate_img" src="https://static.naukimg.com/rstatic/images/up.gif" alt="" width="9" height="14" align="absmiddle" />}
                    {this.displayOptions.order == "DESC" && <img id="id_postdate_img" src="https://static.naukimg.com/rstatic/images/down.gif" alt="" width="9" height="14" align="absmiddle" />}
                  </span></a></h3><span>[Next Refresh Date]</span></span></div>
                <div style={{ width: '85px' }}>
                <h3>Responses 
                </h3>
                </div>
              </li>
            </ul>
            <Jobs key={selectedPage} isRefresh={isRefresh} jobs={jobs} displayOptions={this.displayOptions} responses={responses}/>
          </div>
        }  

        <p className="opButtons pt10 buDark">
          <input type="checkbox" name="jobId[]" value='all'/>
          <input type="button" value="Refresh" onClick={this.operation.bind(null)} />
          <input type="button" value="Share" onClick={this.operation.bind(null)} />
          <input type="button" value="Unshare" onClick={this.operation.bind(null)} />
          <input type="button" value="Remove" onClick={this.operation.bind(null)} />
          <input type="button" value="Invite Referrals" onClick={this.operation.bind(null)} />
          <strong className="ml50">Posted By </strong> <Picker onChange={this.loadUserJobs} options={[ 'All', 'You', 'Others' ]} />
          <strong className="ml15">Status </strong> <Picker onChange={this.loadDifferentJobs} options={[ 'All Jobs', 'Active', 'Inactive', 'Shared', 'Unshared' ]} />
          <strong className="ml15">Show </strong> <Picker value={jobsPerPage} onChange={this.loadJobsPerPage} options={[ 20, 30, 40, 50, 100, 150 ]} /> per page
          { typeof jobs !== "undefined" && <Pagination prevPageText='Previous' nextPageText='Next' firstPageText='First' lastPageText='Last'
            pageRangeDisplayed={5} activePage={this.props.criteria.pageIndex} itemsCountPerPage={this.props.criteria.jobsPerPage} totalItemsCount={this.props.criteria.totalJobsCount}
            onChange={
              (index) => { var a = index ? index : 1; loadPage(a) }
            } />
        }
        </p>

        
      </div>
    )
  }
}

JobListingApp.PropTypes = {
  selectedJobType: PropTypes.string.isRequired,
  jobs: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  updateJobType: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedJobType, jobsByJoblisting } = state
  const {
    isFetching,
    lastUpdated,
    jobs
  } = jobsByJoblisting[selectedJobType] || {
    isFetching: true,
    jobs: []
  }

  return {
    selectedJobType,
    jobs,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(JobListingApp)
