import React, { Component,Fragment } from 'react';
import TodoItem from "./TodoItem";
import axios from "axios";

class Todolist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue:'',
            list:[]
        }
        this.handleInputValue = this.handleInputValue.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    render() {
        return (
            <Fragment>
                <div>
                    <input 
                        value={this.state.inputValue}
                        onChange={this.handleInputValue}
                        />
                        <button
                            onClick={this.handleBtnClick}
                        >
                        提交</button>
                </div>
                <ul>
                    {
                      this.state.list.map((item,index) => {
                          return (
                              <TodoItem 
                              key={index}
                              index={index}
                              item={item}
                              deleteItem={this.handleDelete}
                              />
                          )
                      })                      
                    }

                    {/*
                        this.state.list.map((item,index) => {
                            return (
                                <li 
                                    key={index}
                                    onClick={this.handleDelete.bind(this,index)}
                                    >
                                    {item}
                                </li>
                            )
                        })
                      */}
                </ul>
            </Fragment>
        )
    }

    componentDidMount(){
        axios.get('/api/todolist').then(resp => {
            alert("succ")
        }).catch(err => {
            alert("err")
        })
    }

    handleInputValue(e){
        // console.log(e.target.value)
        // console.log(this)
        // this.setState({
        //     inputValue:e.target.value
        // })
        const value = e.target.value;
        this.setState(() => ({
          inputValue:value
        }));
    }

    handleBtnClick(){
        // this.setState({
        //     list:[...this.state.list,this.state.inputValue],
        //     inputValue:''
        // })
        this.setState((prevState) => ({
          list:[...prevState.list,prevState.inputValue],
          inputValue:''
        }));
    }

    handleDelete(index){
        // console.log(index)
        // const list = [...this.state.list];
        // list.splice(index,1)
        // this.setState({
        //     list
        // })
        this.setState((prevState) => {
          const list = [...prevState.list];
          list.splice(index,1)
          return {list}
        })
    }
}


export default Todolist;