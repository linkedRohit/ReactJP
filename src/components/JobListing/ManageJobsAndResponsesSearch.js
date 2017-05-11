import React, { Component, PropTypes } from 'react'

class ManageJobsAndResponsesSearch extends Component {
  constructor(props) {
    super(props);  
    this.handleSearch = this.handleSearch.bind(this);   
  }

  handleSearch(e) {
    console.log(e.target);
  }

  render() {
    const { search } = this.props;

    return (
      <div className="searchAndManageBox">        
        {/*Search Box Section*/}
        <div className="searchHeader">Search Jobs</div>
        <div className="searchForm">
          <label>Keywords</label>
          <input type='text' name='keyword' placeholder='Title/Job Id/Job Ref No.' size='17'/>
          <label>Search in</label>
          <select name="keywordType" id="srcIn" className="disBlock">
            <option value="position">Position</option>
            <option value="jobid">JobID</option>
            <option value="reference">Reference</option>
          </select>
          <label>Job posted duration:</label>
          <span><input type="text" placeholder="From Date" name="postedFromDate" size="13"/><img alt='From Date' className="imgCalendar" src="../img/calendar.svg"/></span>
          <span><input type="text" placeholder="To Date" name="postedToDate" size="13"/><img alt='To Date' className="imgCalendar" src="../img/calendar.svg"/></span>
          <label>Job Type:</label>
          <div className="lh1">
            <label><input type="checkbox" name="privateJob"/>Private Jobs</label>
            <label><input type="checkbox" name="premiumJob" />Premium Jobs</label>
            <label><input type="checkbox" name="hotJob" />Hot Vacancies</label>
            <label><input type="checkbox" name="classifiedJob" />Classifieds</label>
            <label><input type="checkbox" name="ijpJob" />IJP Jobs</label>
          </div>
          <input type="button" className="jpButton searchButton" style={{height:30}} value="Search" onClick={this.handleSearch}/>
        </div>                  

        {/*Account Utlization Section*/}
        <div className="searchHeader mt20">Account Utilization</div>
        <div className="accountUtilization mt10">
          <div><strong>Hot Vacancy :</strong> 342 left</div>
          <div><strong>Classified :</strong> 38 left</div>
        </div>

        {/*Manage Duplicates Section*/}
        <div className="searchHeader mt20">Manage Duplicates</div>
        <div className="manageDuplicate mt10">
          <div>Block duplicate applies across eapps jobs <img alt='Help text' src="../img/info.png" height='10px'/><br/><a href="#">Manage</a></div>
        </div>
      </div>
    )
  }
}

ManageJobsAndResponsesSearch.propTypes = {
  keyword: PropTypes.string,
  keywordType: PropTypes.string,
  postedFromDate: PropTypes.instanceOf(Date),
  postedToDate: PropTypes.instanceOf(Date),
  privateJob: PropTypes.bool,
  premiumJob: PropTypes.bool,
  hotJob: PropTypes.bool,
  classifiedJob: PropTypes.bool,
  ijpJob: PropTypes.bool,
}

export default ManageJobsAndResponsesSearch;