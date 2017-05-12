import React, { Component } from 'react'
import { connect } from 'react-redux'
import JobListing from '../../components/JobListing/JobListing'
import { toggleTab, loadPage, searchJobs } from '../../actions/JobListing/jobListing'

//This is a Container component
class JobListingContainer extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      //Component part
      return (
         <div>
            <JobListing criteria={this.props.criteria} toggleTab={this.props.toggleTab} loadPage={this.props.loadPage} notification={this.props.notifications} search={this.props.search} /> 
         </div>
      )
    }
}

//Container part
const mapDispatchToProps = (dispatch) => {
    return ({
        toggleTab: (index) => {dispatch(toggleTab(index))},
        loadPage: (index) => {dispatch(loadPage(index))}//,
        //searchJobs: (searchCriteria) => {dispatch(searchJobs(searchCriteria))},
    })
};

const mapStateToProps = (state) => {
   return {/*
       jobType: state.selectJobType,
       errors: state.errors,
       criteria: state.updatedCriteria.criteria,
       tab: state.tab*/
       criteria: state.updatedCriteria.criteria,
       selectedPage: state.selectedJobType,
       notifications: state.notifications,
       search: state.search
   };
};


export default connect(mapStateToProps, mapDispatchToProps)(JobListingContainer);

