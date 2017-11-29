import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default function LoadingCreate(WrappedComponent) {
    class LoadingCreate extends Component {
        state = {
            shellDOM: null
        }
        componentDidMount() {
            console.log('mount')
            //this.createShell(WrappedComponent)
        }
        createShell(WrappedComponent) {
            let wrapprdNode = ReactDOM.findDOMNode(WrappedComponent);

        }
        render() {
            const elementsTree = super.render();
            return (
                <div className="shell-loading">
                    <WrappedComponent />
                </div>
            )
        }
    }
    LoadingCreate.displayName = `LoadingCreate(${getDisplayName(WrappedComponent)})`;
    return LoadingCreate;
}
//方便react-dev tool 进行检查识别
function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
