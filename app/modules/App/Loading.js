import React from 'react';
import LoadingHOC from 'components/LoadingHOC';
import './loading.scss';

export default function Loading() {
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
export const LoadingV2 = LoadingHOC(Loading);


