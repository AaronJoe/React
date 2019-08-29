import React, { Component } from 'react';

class TodoItem extends Component {

  constructor(props) {
    super(props);
    this.state={

    }
    this.handleClick = this.handleClick.bind(this)
  }

  render() {
    const {item} = this.props;
    return (
      <div onClick={this.handleClick}>
        {item}
      </div>
    );
  }

  handleClick(){
    // this.props.deleteItem(this.props.index);
    const { deleteItem, index} = this.props;
    deleteItem(index);
  }
}

export default TodoItem;