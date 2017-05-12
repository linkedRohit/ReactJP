import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchFormComponent from '../../components/JobListing/JobListing'
import { searchJobs } from '../../actions/JobListing/jobListing'

//This is a Container component
class SearchFormContainer extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      //Component part
      return (
         <div>
            <SearchFormComponent /> 
         </div>
      )
    }
}

//Container part
const mapDispatchToProps = (dispatch) => {
    return ({
        //searchJobs: (searchCriteria) => {dispatch(searchJobs(searchCriteria))}
    })
};

const mapStateToProps = (state) => {
   return ({
   })
};


export default connect(mapStateToProps, mapDispatchToProps)(SearchFormContainer);

