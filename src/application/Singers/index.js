import React, { useContext, useEffect } from 'react'
import Horizen from '../../baseUI/HorizenItem'
import Scroll from '../../baseUI/Scroll'
import { categoryTypes, alphaTypes } from '../../api/config'
import { CHANGE_CATEGORY, CHANGE_ALPHA, Data, CategoryDataContext } from './data'
import { 
  NavContainer,
  ListContainer,
  List,
  ListItem
} from "./style"
import { 
  getSingerList, 
  getHotSingerList, 
  changeEnterLoading, 
  changePageCount, 
  refreshMoreSingerList, 
  changePullUpLoading, 
  changePullDownLoading, 
  refreshMoreHotSingerList 
} from './store/actionCreators'
import {connect} from 'react-redux'
import Loading from '../../baseUI/Loading'
import  LazyLoad, {forceCheck} from 'react-lazyload'

function Singers (props) {
  const {data, dispatch} = useContext (CategoryDataContext)
  const {category, alpha} = data.toJS()

  const { singerList, enterLoading, pullUpLoading, pullDownLoading, pageCount } = props
  const { getHotSingerDispatch, updateDispatch, pullDownRefreshDispatch, pullUpRefreshDispatch } = props

  useEffect(() => {
    if (!singerList.size) {
      getHotSingerDispatch ()
    }
  }, [])

  let handleUpdateAlpha = (val) => {
    dispatch ({type: CHANGE_ALPHA, data: val})
    updateDispatch(category, val)
  }
  let handleUpdateCatetory = (val) => {
    dispatch ({type: CHANGE_CATEGORY, data: val})
    updateDispatch(val, alpha)
  }

  const handlePullUp = () => {
    pullUpRefreshDispatch (category, alpha, category === '', pageCount)
  }
  
  const handlePullDown = () => {
    pullDownRefreshDispatch (category, alpha)
  }

  // 渲染函数，返回歌手列表
  const renderSingerList = () => {
    const list = singerList ? singerList.toJS(): [];
    return (
      <List>
        {
          list.map ((item, index) => {
            return (
              <ListItem key={item.accountId+""+index}>
                <div className="img_wrapper">
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require ('../../assets/image/singer.png')} alt="music"/>}>
                    <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
                  </LazyLoad>
                </div>
                <span className="name">{item.name}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  }
  
  return (
    <div>
      <Data>
        <NavContainer>
          <Horizen 
            list={categoryTypes} 
            title={"分类 (默认热门):"}
            handleClick={handleUpdateCatetory} 
            oldVal={category}
          />
          <Horizen 
            list={alphaTypes} 
            title={"首字母:"}
            handleClick={handleUpdateAlpha} 
            oldVal={alpha}
          />
        </NavContainer>
        <ListContainer>
          <Scroll
            pullUp={ handlePullUp }
            pullDown = { handlePullDown }
            pullUpLoading = { pullUpLoading }
            pullDownLoading = { pullDownLoading }
            onScroll={forceCheck}
          >
            { renderSingerList () }
          </Scroll>
          <Loading show={enterLoading}></Loading>
        </ListContainer>
      </Data>
    </div>
  )
}
const mapStateToProps = (state) => ({
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount'])
});
const mapDispatchToProps = (dispatch) => {
  return {
    getHotSingerDispatch() {
      dispatch(getHotSingerList())
    },
    updateDispatch(category, alpha) {
      dispatch(changePageCount(0))
      dispatch(changeEnterLoading(true))
      dispatch(getSingerList(category, alpha))
    },
    // 滑到最底部刷新部分的处理
    pullUpRefreshDispatch(category, alpha, hot, count) {
      dispatch(changePullUpLoading(true))
      dispatch(changePageCount(count+1))
      if(hot){
        dispatch(refreshMoreHotSingerList())
      } else {
        dispatch(refreshMoreSingerList(category, alpha))
      }
    },
    //顶部下拉刷新
    pullDownRefreshDispatch(category, alpha) {
      dispatch(changePullDownLoading(true))
      dispatch(changePageCount(0));//属于重新获取数据
      if(category === '' && alpha === ''){
        dispatch(getHotSingerList())
      } else {
        dispatch(getSingerList(category, alpha))
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers))