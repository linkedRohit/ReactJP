import React, { Component } from 'react'
import { connect } from 'react-redux'
import JobListing from '../../components/JobListing/JobListing'
import { toggleTab, loadPage } from '../../actions/JobListing/jobListing'
import ReduxToastr from 'react-redux-toastr'

//This is a Container component
class JobListingContainer extends Component {
    constructor(props) {
      super(props);
      console.log(props,123899289);
    }

    render() {
      //Component part
      return (
         <div>
            {/*<ErrorList errors={errors} />{this.props.notifyUser.notifyType == "success" && toastr.success(this.props.notifyUser.notifyHeader, this.props.notifyUser.notifyMessage) }*/}
            <JobListing criteria={this.props.criteria} toggleTab={this.props.toggleTab} loadPage={this.props.loadPage}/>
            
         </div>
      )
    }
}

//Container part
const mapDispatchToProps = (dispatch) => {
    return ({
        toggleTab: (index) => {dispatch(toggleTab(index))},
        loadPage: (index) => {dispatch(loadPage(index))}
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
       notifyUser: state.notifyUser
   };
};


export default connect(mapStateToProps, mapDispatchToProps)(JobListingContainer);

