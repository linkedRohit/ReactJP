import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadPage, toggleTab, updateCriteria, selectedJobType, fetchJobsIfNeeded, invalidateJobListing, reloadJobListing} from '../../actions/JobListing/jobListing'
import { notifyUser } from '../../actions/Generic/NotificationActions'
import Picker from '../Generic/Picker'
import Jobs from './Jobs'
import Pagination from 'react-js-pagination'
import Notifications from 'react-notification-system-redux';

class SaveJobsListingApp extends Component {
  constructor(props) {
    super(props)
    this.selectedSaveJobsTab = 'all';
    this.fetchJobsOfType = this.fetchJobsOfType.bind(this);
    this.loadJobsPerPage = this.loadJobsPerPage.bind(this);
    this.displayOptions = {'order':'DESC', 'showResponses':false};
  }

  componentDidMount() {
    const { dispatch, selectedJobType, criteria } = this.props;
    //dispatch(updateCriteria(criteria))
    dispatch(fetchJobsIfNeeded(selectedJobType));
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedJobType !== prevProps.selectedJobType) {
      const { dispatch, selectedJobType } = this.props;
      dispatch(fetchJobsIfNeeded(selectedJobType));
    }
  }

  fetchJobsOfType(e) {
    e.preventDefault()
    let jobType = e.target.dataset.type;
    if(typeof jobType === "undefined") {
      jobType = this.selectedSaveJobsTab;
    } else {
      this.selectedSaveJobsTab = jobType;
    }
    const { dispatch } = this.props;
    dispatch(selectedJobType(jobType));
    dispatch(invalidateJobListing(jobType));
    dispatch(fetchJobsIfNeeded(jobType));
  }

  operation() {
    console.log(123);
  }

  loadJobsPerPage(jobShowCount) {
    const { dispatch } = this.props;
    var criteria = {};
    console.log(jobShowCount,1231232);
    criteria.jobsPerPage = parseInt(jobShowCount);
    criteria.jobType = this.selectedSaveJobsTab;
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
    return (
      <div>    
          <Notifications
              notifications={notification}
              style={style}
          />    
      	<div className="opLinks">
          <a href='#' data-type="productivity"
            onClick={this.fetchJobsOfType.bind(null)}>
            Saved Jobs
          </a>
          <a href='#' style={{border:0}} data-type="fnf"
            onClick={this.fetchJobsOfType.bind(null)}>
            Auto Saved Jobs
          </a>
        </div>  
        <p className="opButtons pb10 bbDark">
          <input type="checkbox" name="jobId[]" value='all'/>
          <input type="button" value="Delete" onClick={this.operation.bind(null)} />
          <span className="disIn fr">
            <strong className="numPagesSection">Show </strong>
            <Picker value={criteria.jobsPerPage} onChange={this.loadJobsPerPage} options={[ 20, 30, 40, 50, 100, 150 ]} /> per page
          </span>
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
                <div style={{ width : '350px' }}><h3><a href="#">Job Title</a></h3></div>
                <div style={{ width: '125px' }}><h3></h3></div>
                <div style={{ width: '150px' }}><h3>Saved By</h3></div>
                <div style={{ width: '140px' }}>
                  <h3><a href="#">Saved On </a>
                    <span className="ml5">
                      {this.displayOptions.order == "ASC" && <img id="id_postdate_img" src="https://static.naukimg.com/rstatic/images/up.gif" alt="" width="9" height="14" align="absmiddle" />}
                      {this.displayOptions.order == "DESC" && <img id="id_postdate_img" src="https://static.naukimg.com/rstatic/images/down.gif" alt="" width="9" height="14" align="absmiddle" />}
                    </span>
                  </h3>
                </div>
              </li>
            </ul>
            <Jobs jobs={jobs} displayOptions={this.displayOptions} />
          </div>
        }  
        <p className="opButtons pb10 bbDark">
          <input type="checkbox" name="jobId[]" value='all'/>
          <input type="button" value="Delete" onClick={this.operation.bind(null)} />
          <span className="disIn fr">
            <strong className="numPagesSection">Show </strong>
            <Picker value={criteria.jobsPerPage} onChange={this.loadJobsPerPage} options={[ 20, 30, 40, 50, 100, 150 ]} /> per page
          </span>
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

SaveJobsListingApp.PropTypes = {
  selectedJobType: PropTypes.string.isRequired,
  jobs: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
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

export default connect(mapStateToProps)(SaveJobsListingApp)
