import React, { Component } from 'react'
import { connect } from 'react-redux'
import JobListing from '../../components/JobListing/JobListing'
import { selectedJobType, loadPage } from '../../actions/JobListing/jobListing'

//This is a Container component
// class JobListingContainer extends Component {
//     constructor(props) {
//       super(props);
//     }

//     render() {
//       //Component part
//       return (
//          <div>
//             {<ErrorList errors={errors} />}
//             <JobListing criteria = {this.props.criteria} toggleTab={this.props.toggleTab} loadPage={this.props.loadPage}/>
//          </div>
//       )
//     }
// }

//Container part
const mapDispatchToProps = (dispatch) => {
    return ({
        toggleTab: (index) => {dispatch(selectedJobType(index))},
        loadPage: (index) => {dispatch(loadPage(index))}
    })
};

const mapStateToProps = (state) => {
   return {/*
       jobType: state.selectJobType,
       errors: state.errors,
       criteria: state.updatedCriteria.criteria,
       tab: state.tab*/
       criteria: state.updatedCriteria.criteria
   };
};


export default connect(mapStateToProps, mapDispatchToProps)(JobListing);