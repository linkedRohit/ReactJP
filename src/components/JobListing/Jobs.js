import React, { PropTypes, Component } from 'react'

export default class Jobs extends Component {
  render() {
    return (
      <ul className="jobListingDiv">
          <li className="jobListingHeader">
            <div style={{width :"400px"}}><h3>Job Title</h3></div>
            <div style={{ width: '200px'}}><h3>Posted By</h3></div>
            <div style={{ width: '150px' }}><span><h3>Posted On</h3></span></div>
            <div style={{ width: '50px' }}><span style={{width :"50px"}}><h3>Responses</h3></span></div>
          </li>
        { this.renderJobTuples(this.props.jobs) }    
      </ul>
    )
  }

  renderJobTuples(jobs) {
    //console.log(jobs)
    return jobs.map((job, i) => {
      return(
        <li key={i}>          
          <input type="checkbox" name="jobId[]" value={i}/>
          <a href={"http://google.com/" + i} title={job.title} style={{width :"300px"}}>{job.title}</a>
          <div style={{ display: 'inline-block', width: '150px', textAlign:'right'}}></div>
          <div style={{ display: 'inline-block', width: '150px'}}>{job.author}</div>
          <a style={{ overflow: 'visible', width: '75px' }}><span>{new Date(job.created).toLocaleTimeString()}</span></a>
          <a style={{ overflow: 'visible', width: '75px', textAlign:'right' }} href={"http://csm.naukri.com/" + i}><span style={{width :"50px"}}>{job.score}</span></a>
        </li>
      );
    });
  }
}

Jobs.PropTypes = {
  jobs: PropTypes.array.isRequired
}
