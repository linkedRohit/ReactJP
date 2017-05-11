import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import DateTimePicker from 'react-widgets';

/*const data = {
  // used to populate "account" reducer when "Load" is clicked
  firstName: 'Jane',
  lastName: 'Doe',
  age: '42',
  sex: 'female',
  employed: true,
  favoriteColor: 'Blue',
  bio: 'Born to write amazing Redux code.',
};
*/
const keywordType = ['Position', 'JobID', 'Reference'];

let InitializeFromStateForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;

  return (
    <form onSubmit={handleSubmit}>
      	<div className="searchAndManageBox">   
	        <div className="searchHeader">Search Jobs</div>
	      	<div className="searchForm">
	            <label>Keywords</label>
		        <div>
		          <Field
		            name="keyword"
		            component="input"
		            type="text"
		            placeholder="Title/Job Id/Job Ref No."
		          />
	        	</div>
	        </div>
       		<div>
        		<label>Search in</label>
        		<div>
        			<Field name="keywordType" component="select">
			            <option value="">Position</option>
			            {keywordType.map(keywordTypeOption => (
			              <option value={keywordTypeOption} key={keywordTypeOption}>
			                {keywordTypeOption}
			              </option>
			            ))}
			        </Field>
        		</div>
        	</div>
	        <div>
	        	<label>Job posted duration:</label>
	        	<div>
		        	<span><DateTimePicker /></span>
					<span><DateTimePicker /> </span>
			        <Field
			            name="postedFromDate"
			            component="input"
			            type="text"
			            placeholder="Last Name"
			        />
			    </div>
	        </div>
	        <div>
	        	<label>Job Type</label>
	        	<div>
        			<Field name="jobType[]" component="input" type="checkbox" value="1" />
		            {' '}
		            Hot vacancy
		            <Field name="jobType[]" component="input" type="checkbox" value="2" />
		            {' '}
		            Classified Job
		            <Field name="jobType[]" component="input" type="checkbox" value="3" />
		            {' '}
		            Private Job
		            <Field name="jobType[]" component="input" type="checkbox" value="4" />
		            {' '}
		            Premium Job
		            <Field name="jobType[]" component="input" type="checkbox" value="5" />
		            {' '}
		            IJP Job
        		</div>
	        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Undo Changes
        </button>
      </div>
    </form>
  );
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
InitializeFromStateForm = reduxForm({
  form: 'initializeFromState', // a unique identifier for this form
})(InitializeFromStateForm);

// You have to connect() to any reducers that you wish to connect to yourself
InitializeFromStateForm = connect(
  state => ({
    //initialValues: state.account.data, // pull initial values from account reducer
  }),
  //{ load: loadAccount }, // bind account loading action creator
)(InitializeFromStateForm);

export default InitializeFromStateForm;
