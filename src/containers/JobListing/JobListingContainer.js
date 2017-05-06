import React, { Component } from 'react'
import { connect } from 'react-redux'
import JobListing from '../../components/JobListing/JobListing'
import { updateScopeOfListing, toggleTab } from '../../actions/jobListing'

//This is a Container component
class JobListingContainer extends Component {
   render() {
      //const { criteria, errors } = this.props;
      const { criteria } = this.props;

      //Component part
      return (
         <div>
            {/*<ErrorList errors={errors} />*/}
            <JobListing criteria={criteria} toggleTab={toggleTab}/>
         </div>
      )
   }
}

//Container part
const mapDispatchToProps = (dispatch) => {
    return {
        Criteria: (params) => {dispatch(updateScopeOfListing())},
        toggleTab: (index) => {dispatch(toggleTab)}
    }
};

const mapStateToProps = (state) => {
   return {
       jobType: state.selectJobType,
       errors: state.errors,
       criteria: state.Criteria,
       tab: state.tab
   };
};


export default connect(mapStateToProps, mapDispatchToProps)(JobListingContainer);