import React, {Component} from 'react';
import './loading.scss';

export default class Loading extends Component {
    render() {
        return (
            <div className="loading-item">
                <div className="wrap">
                    <div className="item loading_4"></div>
                    <div className="item loading_5"></div>
                    <div className="item loading_6"></div>
                </div>
            </div>
        );
    }
}
export class Loading2 extends Component {
    render() {
        return (
            <div className="loading-item">
                <div className="wrap">
                    <div className="item loading_1"></div>
                    <div className="item loading_2"></div>
                    <div className="item loading_3"></div>
                    <div className="item loading_4"></div>
                    <div className="item loading_5"></div>
                    <div className="item loading_6"></div>
                </div>
            </div>
        );
    }
}
