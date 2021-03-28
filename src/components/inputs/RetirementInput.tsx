import { useState, useCallback } from "react";

import '../App.css';
import DataInput from "./DataInput";

const retirementLabels = [
    ["Annual Income", '$'],
    ["Net Worth", '$'],
    ["Retirement spending", '%'],
    ["Income growth", '%'],
    ["Stock returns", '%'],
    ["Withdrawal rate", '%'],
];

// the API endpoints corresponding to each retirement label/field
export const apiEndpoints = [
    "income",
    "assets",
    "retirement_expenses",
    "income_growth",
    "real_rate",
    "withdraw",
];

const NUM_TO_SHOW: number = 2;

type IFireParams = number[];
export const DefaultFireParams: IFireParams = [0, 0, 100, 1, 6, 3];


interface IProps {
    updateArgs: (args: any[]) => void;
}


export function buildRetirementArguments(retirementValues: number[]): any[] {
    let args: any[] = [];
    for (let i = 0; i < apiEndpoints.length; i++) {
        let value = retirementLabels[i][1] == '%' ? retirementValues[i] / 100 : retirementValues[i];
        args.push([apiEndpoints[i], value]);
    }
    return args;
}


const RetirementInput = (props: IProps): JSX.Element => {
    const { updateArgs } = props;

    const [retirementValues, setRetValues] = useState<number[]>(DefaultFireParams);
    const [isExpanded, setExpanded] = useState<boolean>(false);

    const updateRetParamsClbk = useCallback(
        (value: number, idx: number): void => {
            if (value >= 0 && idx >= 0) {
                var newVals = retirementValues.slice();
                newVals[idx] = value;
                setRetValues(newVals);

                // propagate changes to parent
                let args = buildRetirementArguments(newVals);
                updateArgs(args);
                console.log("updating ret values");
                // console.log(args)
            }
        },
        [retirementValues],
    );

    let inputs = retirementLabels.map(
        ([label, prefix,], idx) =>
            <DataInput
                label={label}
                value={retirementValues[idx]}
                idx={idx}
                formPrefix={prefix}
                callback={updateRetParamsClbk}
                key={idx}
            />
    )

    const expandCallback = useCallback((): void => {
        setExpanded(!isExpanded);
    }, [isExpanded]);

    return (
        <div className="input-box">
            {
                // Show visible
                inputs.slice(0, NUM_TO_SHOW)
            }
            <div className="inline-button-text">
                <button
                    className="base-button expand-button"
                    onClick={expandCallback}>
                    {isExpanded ? '-' : '+'}
                </button>
                <span className="input-label">   Additional settings</span>
            </div>

            { isExpanded &&
                inputs.slice(NUM_TO_SHOW)
            }
        </div>
    );
}

export default RetirementInput;