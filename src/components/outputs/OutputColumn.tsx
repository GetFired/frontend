import React, { useState, useCallback } from "react";
import AssetChart from './AssetChart';
import { DataStatus } from '../inputs/InputColumn'

import '../App.css';

interface IVisualizationData {
    graph: any[];
}

interface IProps {
    data: any;
    dataStatus: DataStatus;
}

const OutputColumn = (props: IProps): JSX.Element => {
    const { data, dataStatus } = props;

    let content: JSX.Element = <div></div>;
    switch (dataStatus) {
        case DataStatus.Empty:
            content = (
                <div className="no-output-block">
                    <span className="Buildup">Enter your data</span>
                </div>

            );
            break;
        case DataStatus.Error:
            content = (
                <div className="no-output-block">
                    <span className="Buildup">Error Processing Data</span>
                </div>
            );
            break;
        case DataStatus.Loaded:
            console.log("months left:",data['months left'] )
            let retYears = (Number(data['months left']) / 12).toFixed(1);
            content = (
                <div className="output-block">
                    <div className="retirement-header">
                        <span className="Punch">{retYears} Years </span> <span className="Buildup">to Retirement</span>
                    </div>
                    <AssetChart graphData={data.graph} fireGoal={data.goal}/>
                </div>
            );
            break;
        default:
        case DataStatus.Loading:
            content = (
                <div className="no-output-block">
                    <span className="Buildup">Loading...</span>
                </div>
            );
            break;
    }

    return content;
}

export default OutputColumn;