import React, { useState, useCallback } from "react";

import '../App.css';

const retirementLabels = [
    "Annual Income (post-tax):",
    "Net Worth:",
    "Withdrawal rate:",
    "Retirement spending:",
    "Growth rate:",
    "Income growth:"
];

// the API endpoints corresponding to each retirement label/field
const apiEndpoints = [
    "income",
    "assets",
    "withdraw",
    "retirement_expenses",
    "real_rate",
    "income_growth",
];

type IFireParams = number[];
const DefaultFireParams: IFireParams = [0, 0, 0, 0, 0];
const RetirementInput = (): JSX.Element => {
    const [retirementValues, setRetValues] = useState<number[]>(DefaultFireParams);

    const updateRetPrmsCallback = useCallback(
        (value: number, idx: number): void => {
            if (value >= 0 && idx >= 0) {
                var newVals = retirementValues.slice();
                newVals[idx] = value;
                setRetValues(newVals);
            }
        },
        [retirementValues],
    );

    return (
    <div className="input-box">
        
    </div>
    );
}

export default RetirementInput;