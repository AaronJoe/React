import { INPUT_CHANGE,ADD_TODO_ITEM,DELETE_ITEM,INIT_LIST } from './actionTypes'
import axios from 'axios';

export const getInputChangeAction = (value) => ({
  type : INPUT_CHANGE,
  value
})

export const getAddAction = () => ({
  type : ADD_TODO_ITEM
})

export const getDeleteAction = (index)=>({
  type: DELETE_ITEM,
  index
})

export const InitListAction = (data)=>({
  type:INIT_LIST,
  data
})

export const getListAction = () => {
  return (dispatch) => {
		axios.get('/api/list').then(res => {
			console.log(res.data)
			const data = res.data;
			const action = InitListAction(data);
			dispatch(action)
		})    
  }
}