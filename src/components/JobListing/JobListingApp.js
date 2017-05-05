import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TabPanel, { TabBody, TabStrip } from 'react-tab-panel'
import { selectJobType, fetchJobsIfNeeded, invalidateJobListing } from '../../actions/jobListing'
import Picker from '../Picker'
import Jobs from '../Jobs'
import { Provider } from 'react-redux'
import configureStore from '../../configureStore'

const store = configureStore()

class JobListingApp extends Component {

  constructor(props) {
    super(props)
    this.fetchJobsOfType = this.fetchJobsOfType.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedJobType } = this.props;
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
    const { dispatch } = this.props;
    dispatch(invalidateJobListing(jobType));
    dispatch(fetchJobsIfNeeded(jobType));
  }

  operation() {
    console.log(123);
  }

  render() {
    const { selectedJobType, jobs, isFetching, lastUpdated } = this.props
    return (
      <div> 
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
          <a href='#' data-type="golf"
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
          <strong className="ml50">Posted By </strong> <Picker onChange={this.loadUserJobs} options={[ 'All', 'You', 'Others' ]} />
          <strong className="ml15">Status </strong> <Picker onChange={this.loadDifferentJobs} options={[ 'All Jobs', 'Active', 'Inactive', 'Shared', 'Unshared' ]} />
          <strong className="ml15">Show </strong> <Picker onChange={this.loadJobsPerPage} options={[ 20, 30, 40, 50, 100, 150 ]} /> per page
        </p>        
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href='#' data-type="all"
               onClick={this.fetchJobsOfType.bind(null)}>
              Refresh
            </a>
          }
        </p>
        {isFetching && jobs.length === 0 &&          
          <div className="jobListLoading"></div>
        }
        {!isFetching && jobs.length === 0 &&
          <h2>Empty.</h2>
        }
        {jobs.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Jobs jobs={jobs} />
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
          <strong className="ml15">Show </strong> <Picker onChange={this.loadJobsPerPage} options={[ 20, 30, 40, 50, 100, 150 ]} /> per page
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
    jobs: jobs
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
