import React, { Component } from 'react';
import FeedBack from 'components/FeedBack';
import './style.scss';
import Loading, {LoadingV2} from './Loading';
import catImg from 'static/images/cat.jpg';

class App extends Component {
    state = {
        current: 'img',
        count: 0
    }

    navs = {
        img: '显示图片',
        form: '显示表单'
    }

    switchNav = current => {
        this.setState({
            current
        });
    }
    componentDidMount() {
        this.setState({count: 1});
        console.log('已经setState{ count ： 1}，此时count为', this.state.count);
        setTimeout(() => {
            this.setState({count: 2});
            console.log('已经再setTimeout回调里边执行setState{ count ： 2}，此时count为', this.state.count);
        }, 0);
    }

    render() {
        return (
            <div className="react-app main">
                <h3>我的react应用</h3>
                <Loading />
                <div className="blank"></div>
                <LoadingV2 />
                <nav>
                    {
                        Object.keys(this.navs)
                            .map(type => <button key={type} className={type == this.state.current ? 'current' : null} onClick={this.switchNav.bind(this, type)}>{this.navs[type]}</button>)
                    }
                </nav>
                { this.state.current === 'img' ?
                    <img className="my-img" src={catImg} alt="cat" /> : <FeedBack /> }
            </div>
        );
    }
}

export default App;

