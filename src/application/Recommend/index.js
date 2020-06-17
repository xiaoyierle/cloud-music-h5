import React, { forwardRef, useState,useEffect, useRef, useImperativeHandle } from 'react'
import Slider from '../../components/Slider'
import { connect } from "react-redux"
import {forceCheck} from 'react-lazyload'
import * as actionTypes from './store/actionCreators'
import RecommendList from '../../components/List'
import Scroll from '../../baseUI/Scroll/index'
import Loading from '../../baseUI/Loading/index'
import { Content } from './style'

function Recommend (props) {
  const { bannerList, recommendList, enterLoading } = props
  const { getBannerDataDispatch, getRecommendListDataDispatch } = props
  useEffect (() => {
    getBannerDataDispatch ()
    getRecommendListDataDispatch ()
    //eslint-disable-next-line
  }, [])
  const bannerListJS = bannerList ? bannerList.toJS () : []
  const recommendListJS = recommendList ? recommendList.toJS () :[]
  return (
    <Content>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList> 
        </div>
      </Scroll>
      { enterLoading ? <Loading></Loading> : null}
    </Content>
  )
}
// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
  // 不要在这里将数据 toJS
  // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
  bannerList: state.getIn (['recommend', 'bannerList']),
  recommendList: state.getIn (['recommend', 'recommendList']),
  enterLoading: state.getIn (['recommend', 'enterLoading'])
})
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch () {
      dispatch (actionTypes.getBannerList ())
    },
    getRecommendListDataDispatch () {
      dispatch (actionTypes.getRecommendList ())
    },
  }
}

// 将 ui 组件包装成容器组件
export default connect (mapStateToProps, mapDispatchToProps)(React.memo (Recommend))