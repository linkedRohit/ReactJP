import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadPage, updateCriteria, selectedJobType, fetchJobsIfNeeded, invalidateJobListing, reloadJobListing } from '../../actions/JobListing/jobListing'
import { notifyUser } from '../../actions/Generic/NotificationActions'
import Picker from '../Generic/Picker'
import Jobs from './Jobs'
import Pagination from 'react-js-pagination'

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
    const { dispatch, selectedJobType, criteria } = this.props;
    //dispatch(updateCriteria(criteria));
    dispatch(fetchJobsIfNeeded(selectedJobType));
  }

  componentDidUpdate(prevProps) {
      if (this.props.selectedJobType !== prevProps.selectedJobType) {
        const { dispatch, selectedJobType } = this.props;
        dispatch(fetchJobsIfNeeded(selectedJobType));
      }
  }

  /*handleClick() {
    const { dispatch } = this.props;
    dispatch(Notifications.success(notificationOpts));
  }*/

  fetchJobsOfType(e) {
    e.preventDefault()
    let jobType = e.target.dataset.type;
    if(typeof jobType === "undefined") {
      jobType = this.selectedListingTab ? this.selectedListingTab : 'all';
    } else {
      this.selectedListingTab = jobType;
    }
    const { dispatch, criteria } = this.props;
    criteria.jobType = jobType;
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
    const { jobs, isFetching, lastUpdated, criteria, loadPage, notification } = this.props;
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

    return (
      <div> 
        <Notifications
              notifications={notification}
              style={style}
          />
        <div className="opLinks">
          <a href='#' data-type="all"
            onClick={this.fetchJobsOfType}>
            All
          </a>
          <a href='#' data-type="cricket"
            onClick={this.fetchJobsOfType}>
            Eapps
          </a>
          <a href='#' data-type="politics"
            onClick={this.fetchJobsOfType}>
            Emails
          </a>
          <a href='#' data-type="rugbyunion"
            onClick={this.fetchJobsOfType}>
            CSM
          </a>
          <a href='#' data-type="golf" style={{ border: 0 }}
            onClick={this.fetchJobsOfType}>
            Other Media Jobs
          </a>
        </div>
        <p className="opButtons pb10 bbDark">
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
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href='#'
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
            <Jobs jobs={jobs} displayOptions={this.displayOptions}/>
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
        </p>

          <Pagination prevPageText='Previous' nextPageText='Next' firstPageText='First' lastPageText='Last'
              pageRangeDisplayed={5} activePage={this.props.criteria.pageIndex} itemsCountPerPage={this.props.criteria.jobsPerPage} totalItemsCount={100}
              onChange={
                (index) => { var a = index ? index : 1; loadPage(a) }
              } />
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
