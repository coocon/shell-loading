import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FeedBack from 'components/FeedBack';
import './style.scss';
import Loading from './Loading';
import LoadingHOC from 'components/LoadingHOC';
import catImg from 'static/images/cat.jpg';

class App extends Component {
    state = {
        html: null
    }
    componentDidMount() {
        this.renderLoading(this.refs.loading);
    }
    renderLoading(loading) {
        let wrapprdNode = ReactDOM.findDOMNode(loading);
        const html = analysisDOM(wrapprdNode);
        console.log(html)
        this.setState({
            html: html
        })
    }
    saveHandler = () => {

    }
    createMarkup(){
        const {html} = this.state;
        return {
            __html: html
        }
    }

    render() {
        return (
            <div className="react-app main">
                <h3>我的react应用</h3>
                <Loading ref="loading"/>
                <div className="blank">生成loading内容如下：</div>
                <div className="shell-loading loading-item">
                    <div className="wrap" dangerouslySetInnerHTML={this.createMarkup()} />
                </div>
                <h4>html代码如下</h4>
                <div className="html-wrap" > </div>
            </div>
        );
    }
}

export default App;

class Rect {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

/**
 * 判断两个矩形是否有重叠
 */
function isOverlap(rc1, rc2) {
    if (rc1.x + rc1.width > rc2.x &&
        rc2.x + rc2.width > rc1.x &&
        rc1.y + rc1.height > rc2.y &&
        rc2.y + rc2.height > rc1.y) {

        return true
    }
    return false;
}

/**
 * rc1 递归分割 rc2
 */
function splitRects(rc1, arrRects) {
    if (arrRects[0]) {
        splitRect(rc1, arrRects[0]);
    }

}
function splitRect(rc1, rc2) {
    var arr = [];
    //如果有重叠
    if (!isOverlap(rc1, rc2)) {
        return
    }
    //全部包裹最多生成4个,最小生成0个 按照【上、左、右、下】的顺序生成
    //上
    if (rc1.y < rc2.y) {
        let rcTop = new Rect(rc1.x, rc1.y, rc1.width, rc2.y - rc1.y);
        arr.push(rcTop);
    }
    //左侧 被包括的rc2可能垂直方向穿透rc1的高度
    if (rc1.x < rc2.x) {
        let rcLeft = new Rect(rc1.x, Math.max(rc1.y, rc2.y), rc2.x - rc1.x, Math.min(rc2.height, rc1.y + rc1.height - rc2.y));
        arr.push(rcLeft);
    }
    //右
    if (rc1.x + rc1.width > rc2.x + rc2.width) {
        let rcRight = new Rect(rc2.x + rc2.width, Math.max(rc1.y, rc2.y), rc1.x + rc1.width - rc2.x - rc2.width, Math.min(rc2.height, rc1.y + rc1.height - rc2.y));
        arr.push(rcRight);
    }
    //下
    if (rc1.y + rc1.height > rc2.y + rc2.height) {
        let rcTop = new Rect(rc1.x, rc2.y + rc2.height, rc1.width, rc1.y + rc1.height - rc2.y - rc2.height);
        arr.push(rcTop);
    }
    return arr;
}

/**
 * 渲染得到的矩形区域到dom中
 * @param {Array} arrRects
 */
function renderRects(arrRects) {
    var htmls = [];
    arrRects.forEach(item => {
        const {x, y, width, height} = item;
        let ele = `<div class="item" style="left:${x}px;top:${y}px;width:${width}px;height:${height}px"></div>`;
        htmls.push(ele);
    })
    return htmls.join('');
}

/**
 * 根据一个dom节点，生成反向loading的dom结构
 */
function analysisDOM(domNode) {
    //loading-item 的宽度和高度
    const wrapNode = domNode.querySelector('.wrap');
    //外层矩形宽度和高度
    let {offsetWidth, offsetHeight} = wrapNode;
    let mainRect = new Rect(0, 0, offsetWidth, offsetHeight)
    let arrRects = [];

    //绝对定位的元素
    for (let i = 0, len = wrapNode.childNodes.length; i < len; i++) {
        let item = wrapNode.childNodes[i];
        const {offsetLeft, offsetTop, offsetWidth, offsetHeight} = item;
        arrRects.push(new Rect(offsetLeft, offsetTop, offsetWidth, offsetHeight));
    }

    //被分割矩形
    let splitRects = splitRect(mainRect, arrRects[0]);
    let html = renderRects(splitRects);
    return html;
    console.log(mainRect, arrRects, splitRect);
}
