import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateCriteria, selectedJobType, fetchJobsIfNeeded, invalidateJobListing, reloadJobListing} from '../../actions/jobListing'
import Picker from '../Common/Picker'
import Jobs from './Jobs'

class SaveJobsListingApp extends Component {
  constructor(props) {
    super(props)
    this.selectedSaveJobsTab = 'all';
    this.fetchJobsOfType = this.fetchJobsOfType.bind(this);
    this.loadJobsPerPage = this.loadJobsPerPage.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedJobType, criteria } = this.props;
    dispatch(updateCriteria(criteria))
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
    criteria.jobsPerPage = jobShowCount;
    criteria.jobType = this.selectedSaveJobsTab;
    dispatch(updateCriteria(criteria));
    dispatch(reloadJobListing(criteria));
  }

  render() {
    const { jobs, isFetching, lastUpdated, criteria } = this.props;
    console.log(this.props,12309);    
    return (
      <div>        
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
            <Jobs jobs={jobs} />
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
