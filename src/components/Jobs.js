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
    console.log(jobs)
    return jobs.map((job, i) => {
      return(
        <li key={i}>          
          <input type="checkbox" name="jobId[]" value={i}/>
          <a href={"http://google.com/" + i} title={job.title}>{job.title}</a>
          <span className="ml75">{job.author}</span>
          <span className="mr25 fr"><a style={{ overflow: 'visible' }} href={"http://csm.naukri.com/" + i}>{job.score}</a></span>
        </li>
      );
    });
  }
}

Jobs.PropTypes = {
  jobs: PropTypes.array.isRequired
}
