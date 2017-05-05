import React, { PropTypes, Component } from 'react'

export default class Jobs extends Component {
  render() {
    return (
      <ul className="jobListingDiv">
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
