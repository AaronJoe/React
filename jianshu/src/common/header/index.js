import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { actionCreators }  from './store';
import { actionCreators as loginActionCreators } from '../../pages/login/store'

import { HeaderWrapper,
        Logo,
        Nav,
        NavItem,
        SearchWrapper,
        NavSearch,
        Addition,
        Button,
        SearchInfo,
        SearchInfoTitle,
        SearchInfoSwitch,
        SearchInfoList,
        SearchInfoItem
      } from './style';

class Header extends Component{

  getListArea(){
    const { focused,list,page,totalPage,handleMouseEnter,mouseIn,handleMouseLeave,handleChangePage } = this.props;
    const newList = list.toJS();
    const pageList = [];
    
    if(newList.length){
      for (let i = (page - 1) * 10; i < page * 10; i++) {
        pageList.push(
          <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
        )
      }
    }

    if(focused || mouseIn){
      return (
        <SearchInfo 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
        <SearchInfoTitle>
          热门搜索
          <SearchInfoSwitch onClick={() => handleChangePage(page,totalPage,this.spinIcon)}>
            <span ref={(icon) => {this.spinIcon = icon}} className="iconfont spin">&#xe851;</span>
            换一换
          </SearchInfoSwitch>
        </SearchInfoTitle>
        <SearchInfoList>
          {pageList}
        </SearchInfoList>
      </SearchInfo>
      )
    }else{
      return null;
    }
  }  

  render(){
    const { focused, handleInputFocus, handleInputBlur,login,logout } = this.props;
    return (
      <HeaderWrapper>

        <Link to='/'>
          <Logo />
        </Link>
      
      <Nav>
        <NavItem className='left active'>首页</NavItem>
        <NavItem className='left'>下载App</NavItem>
        
        {
          login ? 
            <NavItem onClick={logout} className='right'>退出</NavItem> : 
            <Link to='/login'><NavItem className='right'>登陆</NavItem></Link>
        }
        
        <NavItem className='right'>
          <span className="iconfont">&#xe636;</span>
        </NavItem>
  
        <SearchWrapper>
          <CSSTransition
            in={focused}
            timeout={200}
            classNames="slide"  
          >
            <NavSearch
              className={focused ? 'focused': ''}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            ></NavSearch>
          </CSSTransition>
          <span className={focused ? 'focused iconfont zoom': 'iconfont zoom'}>
            &#xe647;
          </span>
          {this.getListArea()}
        </SearchWrapper>     
        
      </Nav>
      <Addition>
        <Button className='writting'>
          <span className="iconfont">&#xe615;</span>
          写文章
        </Button>
        <Button className='reg'>注册</Button>
      </Addition>
    </HeaderWrapper>
    )
  }
}    

const mapStateToProps = (state) => {
  return {
    focused:state.getIn(['header','focused']),
    // focused:state.get('header').get('focused')
    list:state.getIn(['header','list']),
    page:state.getIn(['header','page']),
    totalPage:state.getIn(['header','totalPage']),
    mouseIn:state.getIn(['header','mouseIn']),
    login:state.getIn(['login','login'])
  }
}

const mapDispathToProps = (dispath) => {
  return{
    handleInputFocus(){
      dispath(actionCreators.getList());
      dispath(actionCreators.searchFocus());
    },
    handleInputBlur(){
      dispath(actionCreators.searchBlur());      
    },
    handleMouseEnter(){
      dispath(actionCreators.mouseEnter());
    },
    handleMouseLeave(){
      dispath(actionCreators.mouseLeave());
    },
    handleChangePage(page,totalPage,spin){
      
      let originAngle = spin.style.transform.replace(/[^0-9]/ig, '');

      if (originAngle) {
				originAngle = parseInt(originAngle);
			}else {
				originAngle = 0;
      }

      spin.style.transform = 'rotate(' + (originAngle + 360) + 'deg)';
      
      if(page < totalPage){
        dispath(actionCreators.handleChangePage(page+1));
      }else{
        dispath(actionCreators.handleChangePage(1));
      }
      
    },
    logout() {
			dispath(loginActionCreators.logout())
		}
  }
}

export default connect(mapStateToProps,mapDispathToProps)(Header);