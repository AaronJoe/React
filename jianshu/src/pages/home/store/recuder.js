import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
  topicList:[],
  articleList:[],
  recommendList:[],
  articlePage:1,
  showScroll:false
});

export default (state = defaultState,action) => {

  //   immutable对象的set方法，会结合之前immutable对象的值
  //   和设置的值，返回一个新对象。  

	switch(action.type) {
    case constants.CHANGE_HOME_DATA:
      return state.merge({
        topicList:fromJS(action.topicList),
        articleList:fromJS(action.articleList),
        recommendList:fromJS(action.recommendList)
      })
    case constants.ADD_ARTICLE_LIST:
      return state.merge({
        'articleList': state.get('articleList').concat(action.list),
        'articlePage': action.nextPage
      });
    case constants.TOGGLE_SCROLL_TOP:
        return state.set('showScroll', action.show);           
		default:
			return state;
	}  

}