import React, {Component} from 'react';  
import CheckboxOrRadioGroup from '../FormComponents/CheckboxOrRadioGroup';  
import SingleInput from '../FormComponents/SingleInput';  
import TextArea from '../FormComponents/TextArea';  
import Select from '../FormComponents/Select';

class SearchFormContainer extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      jobSelections: ['Private Jobs', 'Premium Jobs', 'Hot Vacancies', 'Classifieds', 'IJP Jobs'],
      selectedJobTypes: ['Private Jobs', 'Premium Jobs', 'Hot Vacancies', 'Classifieds', 'IJP Jobs'],
      keywordType: ['Position', 'JobID', 'Reference'],
      keywordTypeRangeSelection: 'Position',
      touched: {
      	keyword: false,
      	keywordType: false
      },
      errors: []
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleFullNameChange = this.handleFullNameChange.bind(this);
    this.handleKeywordTypeSelect = this.handleKeywordTypeSelect.bind(this);
    this.handleJobSelection = this.handleJobSelection.bind(this);
  }
  componentDidMount() {
    // simulating a call to retrieve user data
    // (create-react-app comes with fetch polyfills!)
    fetch('./fake_db.json')
      .then(res => res.json())
      .then(data => {
        this.setState({
          keyword: data.keyword,
          jobSelections: data.jobSelections,
          selectedJobTypes: data.selectedJobTypes,
          keywordType: data.keywordType,
          keywordTypeRangeSelection: data.keywordTypeRangeSelection
        });
      });
  }

  handleBlur = (field) => (evt) => {
  	this.setState({
  		touched: {...this.state.touched, [field]: true},
  	});
  	this.render();
  }

  handleFullNameChange(e) {
    this.setState({ keyword: e.target.value });
  }

  handleKeywordTypeSelect(e) {
    this.setState({ keywordTypeRangeSelection: e.target.value });
  }
  handleJobSelection(e) {
    const newSelection = e.target.value;
    let newSelectionArray;
    if(this.state.selectedJobTypes.indexOf(newSelection) > -1) {
      newSelectionArray = this.state.selectedJobTypes.filter(s => s !== newSelection)
    } else {
      newSelectionArray = [...this.state.selectedJobTypes, newSelection];
    }
    this.setState({ selectedJobTypes: newSelectionArray });
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      keyword: '',
      selectedJobTypes: ['Private Jobs', 'Premium Jobs', 'Hot Vacancies', 'Classifieds', 'IJP Jobs'],
      keywordTypeRangeSelection: 'Position'
    });
  }
      
  handleFormSubmit(e) {
    e.preventDefault();

    const formPayload = {
      keyword: this.state.keyword,
      selectedJobTypes: this.state.selectedJobTypes,
      keywordTypeRangeSelection: this.state.keywordTypeRangeSelection
    };

    console.log('Send this in a POST request:', formPayload)
    this.handleClearForm(e);
  }

  validate() {
	  // true means invalid, so our conditions got reversed
	  return {
	    keyword: this.state.keyword.length === 0,
	    keywordType: this.state.keywordType.length === 0,
	  };
	}

  render() {
  	const errors = this.validate();

  	const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];

      return hasError ? shouldShow : false;
    };

    return (
      	<form className="container" onSubmit={this.handleFormSubmit}>
	        <div className="searchAndManageBox">  
	        	<div className="searchHeader">Search Jobs</div>
	        	<div className="searchForm">
		        <SingleInput onBlur={this.handleBlur('Keyword')}
		          style={{ width: 160 }}
		          inputType={'text'}
		          title={'Keyword'}
		          name={'keyword'}
		          mandatory={true}
		          controlFunc={this.handleFullNameChange}
		          content={this.state.keyword}
		          placeholder={'Title\/Job Id\/Job Ref No.'} 
		          class={shouldMarkError('Keyword') ? "error" : ""}/>

		        <label>Search in</label>
		        <Select
		          title={'Keyword Type'}
		          name={'keywordType'}
		          controlFunc={this.handleKeywordTypeSelect}
		          options={this.state.keywordType}
		          selectedOption={this.state.keywordTypeRangeSelection} />

		        <label>Job posted from</label>
				<span><SingleInput
		          style={{ width: 120, float: 'left' }}
		          inputType={'text'}
		          name={'postedFromDate'}
		          controlFunc={this.handleFullNameChange}
		          content={this.state.keyword}
		          placeholder={'From Date'} /><img alt='To Date' className="imgCalendar" src="../img/calendar.svg"/>
		          </span>

				<span>
		        <SingleInput
		          style={{ width: 120, float: 'left' }}
		          inputType={'text'}
		          name={'postedToDate'}
		          controlFunc={this.handleFullNameChange}
		          content={this.state.keyword}
		          placeholder={'To Date'} /><img alt='To Date' className="imgCalendar" src="../img/calendar.svg"/>
		       	</span>

		        <CheckboxOrRadioGroup
		          title={'Job Type'}
		          setName={'jobType'}
		          type={'checkbox'}
		          controlFunc={this.handleJobSelection}
		          options={this.state.jobSelections}
		          selectedOptions={this.state.selectedJobTypes} />

		        <input
		          type="submit"
		          className="btn btnPrimary float-right" style={{padding:'3px 30px', fontWeight:'bold'}}
		          value="Search"/>

		        <input type="button"
		          className="btn btnDefault float-left" style={{padding:'0px 5px'}}
		          onClick={this.handleClearForm} value="Reset" />

		        {this.state.keyword && <label>Searching <strong>{this.state.keyword}</strong> as <br/><strong>{this.state.keywordTypeRangeSelection}</strong></label>}
		        </div>
		    </div>
        </form>
    );
  }
}

export default SearchFormContainer;