import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FeedBack from 'components/FeedBack';
import './style.scss';
import Loading from './Loading';
import LoadingHOC from 'components/LoadingHOC';
import catImg from 'static/images/cat.jpg';
import {Rect, CircleRect} from './BaseClass';

class App extends Component {
    state = {
        html: null
    };
    componentDidMount() {
        this.renderLoading(this.refs.loading);
    }
    renderLoading(loading) {
        let wrapprdNode = ReactDOM.findDOMNode(loading);
        const html = analysisDOM(wrapprdNode);
        this.setState({
            html: html
        });
    }
    saveHandler = () => {};
    createMarkup() {
        const { html } = this.state;
        return {
            __html: html
        };
    }
    createMarkupHTML() {
        const { html } = this.state;
        const str = `<div className="shell-loading loading-item">
            <div className="wrap">
                ${html}
            </div>
        </div>`;
        return str;
    }

    render() {
        return (
            <div className="react-app main">
                <h3>创建普通的DOM元素并布局</h3>
                <Loading ref="loading" />
                <div className="blank">生成带动画的骨架loading内容如下：</div>
                <div className="shell-loading loading-item">
                    <div className="wrap" dangerouslySetInnerHTML={this.createMarkup()} />
                </div>
                <h4>html代码如下</h4>
                <pre className="html-wrap">{this.createMarkupHTML()}</pre>
            </div>
        );
    }
}

export default App;


/**
 * 判断两个矩形是否有重叠
 */
function isOverlap(rc1, rc2) {
    if (
        rc1.x + rc1.width > rc2.x &&
        rc2.x + rc2.width > rc1.x &&
        rc1.y + rc1.height > rc2.y &&
        rc2.y + rc2.height > rc1.y
    ) {
        return true;
    }
    return false;
}

/**
 * rc1 递归分割 rc2
 */
function splitRects(resRects, arrRects) {
    //如果右侧等待split的rects为空证明已经分割完毕
    if (arrRects.length === 0) {
        return resRects;
    }
    let resRectsV2 = [];
    let rc2 = arrRects.shift();
    for (let i = 0; i < resRects.length; i++) {
        //逐个获取需要拆分的rect，并对rc2元素进行处理
        let rc1 = resRects[i];
        let arr = splitRect(rc1, rc2);
        resRectsV2 = resRectsV2.concat(arr);
    }
    return splitRects(resRectsV2, arrRects);
}
/**
 * rc1分割 rc2以后返回的分散数组
 * @param {Object} 需要被切割的矩形1
 * @param {Object} 矩形2
 * @return {Array} 返回矩形的数组对象
 */
function splitRect(rc1, rc2) {
    var arr = [];
    //如果没有重叠,则把原来的矩形包裹成数组返回，不做切分处理
    if (!isOverlap(rc1, rc2)) {
        return [rc1];
    }
    //全部包裹最多生成4个,最小生成0个 按照【上、左、右、下】的顺序生成
    //上
    if (rc1.y < rc2.y) {
        let rcTop = new Rect(rc1.x, rc1.y, rc1.width, rc2.y - rc1.y);
        arr.push(rcTop);
    }
    //左侧 被包括的rc2可能垂直方向穿透rc1的高度
    if (rc1.x < rc2.x) {
        let rcLeft = new Rect(
            rc1.x,
            Math.max(rc1.y, rc2.y),
            rc2.x - rc1.x,
            Math.min(rc2.height, rc1.y + rc1.height - rc2.y)
        );
        arr.push(rcLeft);
    }
    //右
    if (rc1.x + rc1.width > rc2.x + rc2.width) {
        let rcRight = new Rect(
            rc2.x + rc2.width,
            Math.max(rc1.y, rc2.y),
            rc1.x + rc1.width - rc2.x - rc2.width,
            Math.min(rc2.height, rc1.y + rc1.height - rc2.y)
        );
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
        console.log(item)
        const { x, y, width, height, radius} = item;
        let ele = `<div class="item" style="left:${x}px;top:${y}px;width:${width}px;height:${height}px"></div>`;
        if (radius > width / 2) {
            let r = radius - width / 2;
            ele = `<div class="item" style="left:${x - r}px;top:${y - r}px;width:${width + r * 2}px;height:${height + r * 2}px;
            background:transparent;border:${r}px solid #fff;border-radius:50%"></div>`;
        }

        htmls.push(ele);
    });
    return htmls.join('\n');
}

/**
 * 根据css的盒模型，认为所有元素都是矩形，但是设计中有些圆形的元素（border-radius:50%)，需要覆盖到该位置
 * 实际是生成一个背景是透明(transparent)的border颜色是背景颜色的该矩形的外接圆
 */
function getFillCirleRects(cssBoxRects) {
    let res = [];
    cssBoxRects.forEach(item => {
        console.log(item)
        if (item instanceof CircleRect) {
            res.push(item);
        }
    })
    return res;

}
//可以通过class，也可以通过计算样式
function isCircle(ele) {
    let value = window.getComputedStyle(ele).borderRadius;
    if (value === '50%') {
        return true;
    }
    return false
}
/**
 * 根据一个dom节点，生成反向loading的dom结构
 */
function analysisDOM(domNode) {
    //loading-item 的宽度和高度
    const wrapNode = domNode.querySelector('.wrap');
    //外层矩形宽度和高度
    let { offsetWidth, offsetHeight } = wrapNode;
    let mainRect = new Rect(0, 0, offsetWidth, offsetHeight);
    let cssBoxRects = [];

    //绝对定位的元素
    for (let i = 0, len = wrapNode.childNodes.length; i < len; i++) {
        let item = wrapNode.childNodes[i];
        const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = item;
        //判断是否是圆形
        if (isCircle(item)) {
            cssBoxRects.push(new CircleRect(offsetLeft, offsetTop, offsetWidth, offsetHeight));
        }
        else {
            cssBoxRects.push(new Rect(offsetLeft, offsetTop, offsetWidth, offsetHeight));
        }
    }
    let fillRects = getFillCirleRects(cssBoxRects);
    //被分割矩形
    let resRects = splitRects([mainRect], cssBoxRects);
    
    resRects = resRects.concat(fillRects);
    let html = renderRects(resRects);
    return html;
}
