import { combineReducers } from 'redux'
import { SEARCH } from '../actions/Search/searchActions';
import { modelReducer, formReducer } from 'react-redux-form';

function search() {

}

const searchReducer = combineReducers({
  //search: search,
  search: modelReducer('search'),
  searchForm: formReducer('search')
})