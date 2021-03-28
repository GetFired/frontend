// import React, { useState, useCallback } from "react";
import AssetChart from './AssetChart';

import '../App.css';

const OutputColumn = (): JSX.Element => {

    return (
    <div className="output-block">
        <div className="retirement-header">
        <span className="Punch">15 Years </span> <span className="Buildup">to Retirement</span>
        </div>
        <AssetChart/>
    </div>
    );
}

export default OutputColumn;