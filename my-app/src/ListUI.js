import React from 'react';
import 'antd/dist/antd.css';
import { Input,Button,List } from 'antd';

const ListUI = (props)=> {

  return (
      <div>
        <div>
          <Input 
            value={props.inputValue} 
            placeholder='todo info' 
            style={{width:'300px'}}
            onChange={props.handleChange}
          />
          <Button type="primary" onClick={props.handleAdd}>提交</Button>          
        </div>
        <List
          style={{marginTop:'10px', width:'300px'}}
          bordered
          dataSource={props.list}
          renderItem={
            (item,index) => (
              <List.Item onClick={()=>{props.deleteItem(index)}}>{item}</List.Item>
            )
          }
    />      
      </div>
  )

}


export default ListUI;