import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TabPanel, { TabBody, TabStrip } from 'react-tab-panel'
import { selectedJobListingType, fetchJobsIfNeeded, invalidateJobListing } from '../actions/jobListing'
import Picker from '../components/Picker'
import Jobs from '../components/Jobs'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'

const store = configureStore()

class SaveJobsListingApp extends Component {
  constructor(props) {
    super(props)
    this.selectedJobType = props.listingType;
    this.fetchJobsOfType = this.fetchJobsOfType.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
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

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch, selectedJobType } = this.props
    dispatch(invalidateJobListing(selectedJobType))
    dispatch(fetchJobsIfNeeded(selectedJobType))
  }

  fetchJobsOfType(jobType) {
    const { dispatch } = this.props
    dispatch(invalidateJobListing(jobType))
    dispatch(fetchJobsIfNeeded(jobType))
  }

  render() {
    const { selectedJobType, jobs, isFetching, lastUpdated } = this.props
    console.log(this.props,897)
    return (
      <div>        
      	<div className="opLinks">
          <a href='#'
            onClick={this.fetchJobsOfType.bind(null,'soccer')}>
            Saved Jobs
          </a>
          <a href='#' style={{border:0}}
            onClick={this.fetchJobsOfType.bind(null,'cricket')}>
            Auto Saved Jobs
          </a>
        </div>   	
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href='#'
               onClick={this.handleRefreshClick.bind(null)}>
              Refresh
            </a>
          }
        </p>
        {isFetching && jobs.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && jobs.length === 0 &&
          <h2>Empty.</h2>
        }
        {jobs.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Jobs jobs={jobs} />
          </div>
        }  
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

export default connect(mapStateToProps)(SaveJobsListingApp)
