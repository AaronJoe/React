import React, { PureComponent } from 'react';
import { ListItem,ListInfo,LoadMore } from '../style';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import { Link } from 'react-router-dom';

class List extends PureComponent {
  render() {
    const { articleList,getMoreList,page } = this.props;
    return (
      <div>
        {
          articleList.map(((item,index) => {
            return (
							<Link key={index} to={'/detail/' + item.get('id')}>
								<ListItem >
									<img alt='' className='pic' src={item.get('imgUrl')} />
									<ListInfo>
										<h3 className='title'>{item.get('title')}</h3>
										<p className='desc'>{item.get('desc')}</p>
									</ListInfo>
								</ListItem>
							</Link>            
            )
          }))
        }
	      <LoadMore onClick={() => getMoreList(page)}>更多文字</LoadMore>         
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  articleList:state.getIn(['home','articleList']),
  page: state.getIn(['home', 'articlePage'])
})

const mapDispatchToProps = (dispatch) => ({
  getMoreList(page){
    // console.log(page)
    dispatch(actionCreators.getMoreList(page+1))
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(List);