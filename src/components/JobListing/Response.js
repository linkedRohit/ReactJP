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
		console.log('update');
	}

	componentDidMount() {
		console.log('mount');
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

	render() {
		const { responses, jobId } = this.props;
		let isFetching = responses.fetchingResponse;
		return (
			<div data-key={jobId}>{ isFetching && 
				<div className="loader"></div> 
			}
			{ !isFetching && typeof responses === "undefined" && 
				<span>-</span> 
			}
			{ !isFetching && typeof responses !== "undefined" && 
				responses.jobId === jobId && 
				<p>{responses.details.cummulativeResponseCount} [{responses.details.latestResponseCount}]</p>
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