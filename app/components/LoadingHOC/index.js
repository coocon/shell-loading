import React, {Component} from 'react';

export default function LoadingCreate(WrappedComponent) {

    class LoadingCreate extends Component {
        componentDidMount() {
            console.log('moutn')
        }
        createShell() {

        }
        render() {
            return (
                <div className="shell-loading">
                    <WrappedComponent {...this.props}/>
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



