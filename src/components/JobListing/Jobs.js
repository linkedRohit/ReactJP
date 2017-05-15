import React, { PropTypes, Component } from 'react'
import Response from './Response'

export default class Jobs extends Component {  
  render() {
  console.log(this.props,923892320);    
    return (
      <ul className="jobListingDiv">
        { this.renderJobTuples(this.props.jobs, this.props.displayOptions, this.props.responses, this.props.isRefresh) }    
      </ul>
    )
  }

  renderJobTuples(jobs, displayOptions, responses, isRefresh) {
    return jobs.map((job, i) => {
        var jobKey = isRefresh ? 'refresh_'+i:i;
        if(displayOptions.showResponses, responses) {
          return (
            <li key={i}>          
              <input type="checkbox" name="jobId[]" value={i}/>
              <a href={"http://google.com/" + i} title={job.title} style={{width :"300px"}}>{job.title}</a>
              <div style={{ display: 'inline-block', width: '150px', textAlign:'right'}}></div>
              <div style={{ display: 'inline-block', width: '150px'}}>{job.author}</div>
              <a style={{ overflow: 'visible', width: '75px' }}><span>{new Date(job.created).toLocaleTimeString()}</span></a>
              <Response key={jobKey} jobId={i} responses={responses} isRefresh={isRefresh}/>
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
