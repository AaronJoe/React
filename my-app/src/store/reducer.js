import { INPUT_CHANGE,ADD_TODO_ITEM,DELETE_ITEM,INIT_LIST } from './actionTypes'

const defaultState = {
  inputValue:'',
  list:[]
}

export default( state = defaultState,action) => {
  console.log(state,action)
  
  if(action.type === INPUT_CHANGE){
    const newState = JSON.parse(JSON.stringify(state));
    newState.inputValue = action.value;
    return newState;
  }

  if(action.type === ADD_TODO_ITEM){
    const newState = JSON.parse(JSON.stringify(state));
    newState.list.push(newState.inputValue);
    newState.inputValue='';
    return newState;
  }

  if(action.type === DELETE_ITEM){
    const newState = JSON.parse(JSON.stringify(state));
    newState.list.splice(action.index,1);
    newState.inputValue='';
    return newState;    
  }

  if(action.type === INIT_LIST){
    const newState = JSON.parse(JSON.stringify(state));
    newState.list = action.data;
    newState.inputValue='';
    return newState;
  }  

  return state;
}