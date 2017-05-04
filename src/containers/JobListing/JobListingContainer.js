import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { fetchJobsIfNeeded } from '../../actions/jobListing'
import JobListingView from '../../components/JobListing/JobListingView'
import ManageJobsAndResponsesSearch from '../ManageJobsAndResponsesSearch'


//This is a Container component
class JobListingContainer extends Component {
   render() {
      const { getJobsForListing, errors } = this.props;

      //Component part
      return (
         <div>
            {/*<ErrorList errors={errors} />*/}
            <JobListingView getJobsForListing={getJobsForListing} />
         </div>
      )
   }
}


//Container part
const mapDispatchToProps = (dispatch) => {
    return {
        getJobsForListing: (jobType) => dispatch(fetchJobsIfNeeded(jobType))
        /*toggleTab:()=>{
          dispatch({
            type:"TOGGLE_TAB",
            paload:1
          })
        }*/
    }
};

const mapStateToProps = (state) => {
   return {
       errors: state.errors
   };
};


export default connect(mapStateToProps, mapDispatchToProps)(JobListingContainer);