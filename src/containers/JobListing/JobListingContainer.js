import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import JobListingView from '../../components/JobListing/JobListingView'
import ManageJobsAndResponsesSearch from '../ManageJobsAndResponsesSearch'


//This is a Container component
class JobListingContainer extends Component {
   render() {
      const { updateJobType, errors } = this.props;

      //Component part
      return (
         <div>
            {/*<ErrorList errors={errors} />*/}
            <JobListingView updateJobType={updateJobType} />
         </div>
      )
   }
}


//Container part
const mapDispatchToProps = (dispatch) => {
    return {
        updateJobType: (jobType) => dispatch({
          type: "UPDATE_JOB_TYPE",
          selectedJobType: jobType
        })

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