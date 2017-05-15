import React, { Component, PropTypes } from 'react'; 
import { connect } from 'react-redux'
import { fetchResponsesForJob } 
  from '../../actions/JobListing/jobListing'

class Response extends Component {
	constructor(props) {
	    super(props);
	}

	componentDidUpdate() {
		//this.forceUpdate();
	}

	componentDidMount() {
	    const { dispatch, selectedJobType, jobId } = this.props;
	    //dispatch(updateCriteria(criteria));
	    dispatch(fetchResponsesForJob(jobId, selectedJobType));
	}

	shouldComponentUpdate(nextProps, nextState) {
		//jobId == all condition renders the loader
		if(nextProps.jobId === 'all')
			return true;

		if(nextProps.jobId === nextProps.responses.jobId)
			return true;
		else
			return false;
	}

	componentWillReceiveProps(nextProps) {
		//console.log(this.props, nextProps,912932893);
		const { dispatch, selectedJobType, jobId, isRefresh } = this.props;
	    //dispatch(updateCriteria(criteria));
	    if(isRefresh) {
	        //dispatch(fetchResponsesForJob(jobId, selectedJobType));
	    }
	}

	render() {
		const { responses, jobId, isRefresh } = this.props;
		let isFetching = responses.fetchingResponse;
		return (
			<div style={{ display: 'inline-block', width: '85px' }} data-key={jobId}>{ isFetching && 
				<div className="loader"></div> 
			}
			{ !isFetching && typeof responses === "undefined" && 
				<span>-</span> 
			}
			{ !isFetching && typeof responses !== "undefined" && 
				responses.jobId === jobId && 
				<a style={{ overflow: 'visible', width: '85px', textAlign:'right' }} href={responses.details.responseUrl}>{responses.details.cummulativeResponseCount} [{responses.details.latestResponseCount}]</a>
			}
			</div>
		)
	}
}

Response.PropTypes = {
  response: PropTypes.number.isRequired,
  fetchingResponse: PropTypes.bool
}

function mapStateToProps(state) {
  const { selectedJobType } = state

  return {
    selectedJobType
  }
}

export default connect(mapStateToProps)(Response)