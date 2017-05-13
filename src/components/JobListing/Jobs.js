import React, { PropTypes, Component } from 'react'
import Response from './Response'

export default class Jobs extends Component {
  render() {
    return (
      <ul className="jobListingDiv">
        { this.renderJobTuples(this.props.jobs, this.props.displayOptions, this.props.responses) }    
      </ul>
    )
  }

  renderJobTuples(jobs, displayOptions, responses) {

    return jobs.map((job, i) => {
        if(displayOptions.showResponses, responses) {
          return (
            <li key={i}>          
              <input type="checkbox" name="jobId[]" value={i}/>
              <a href={"http://google.com/" + i} title={job.title} style={{width :"300px"}}>{job.title}</a>
              <div style={{ display: 'inline-block', width: '150px', textAlign:'right'}}></div>
              <div style={{ display: 'inline-block', width: '150px'}}>{job.author}</div>
              <a style={{ overflow: 'visible', width: '75px' }}><span>{new Date(job.created).toLocaleTimeString()}</span></a>
              <a style={{ overflow: 'visible', width: '85px', textAlign:'right' }} href={responses.details.responseUrl}><Response key={i} jobId={i} responses={responses}/></a>
            </li>
          );
        } else {
          return (
            <li key={i}>          
              <input type="checkbox" name="jobId[]" value={i}/>
              <a href={"http://google.com/" + i} title={job.title} style={{width :"350px"}}>{job.title}</a>
              <div style={{ display: 'inline-block', width: '175px' }}><h3></h3></div>
              <div style={{ display: 'inline-block', width: '135px' }}>{job.author}</div>
              <a style={{ overflow: 'visible', width: '125px' }}><span>{new Date(job.created).toLocaleTimeString()}</span></a>
            </li>
          );
        }
    });
  }
}

Jobs.PropTypes = {
  jobs: PropTypes.array.isRequired
}
