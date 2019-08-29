import React, { Component } from 'react';
import ListUI from './ListUI';
import store from './store';
import { getListAction, getInputChangeAction,getAddAction,getDeleteAction } from './store/actionCreators'

class List extends Component {

  constructor(props){
    super(props)
    // console.log(store.getState())
    this.state = store.getState();
		this.handleChange = this.handleChange.bind(this);
		this.handleStoreChange = this.handleStoreChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
		store.subscribe(this.handleStoreChange)
  }

  render() {
    return (
      <ListUI
        inputValue={this.state.inputValue}
        handleChange={this.handleChange}
        handleAdd={this.handleAdd}
				list={this.state.list}
				deleteItem={this.deleteItem}
      />
		)
	}

	componentDidMount(){
		// axios.get('/api/list').then(res => {
		// 	console.log(res.data)
		// 	const data = res.data;
		// 	const action = InitListAction(data);
		// 	store.dispatch(action)
		// })
		const action = getListAction();
		store.dispatch(action)
	}
	
	handleChange(e){
		// console.log(e.target.value);
		const action = getInputChangeAction(e.target.value)
		store.dispatch(action)
	}
	
	handleAdd(){
		const action = getAddAction();
		store.dispatch(action)
	}

	handleStoreChange(){
		// console.log(store.getState())
		this.setState(store.getState())
	}

	deleteItem(index){
		console.log(index)
		const action = getDeleteAction(index);
		store.dispatch(action)
	}

}

export default List;