import React, { useState, useCallback } from "react";

import DataInput from "./DataInput"
import '../App.css';

type IFireParams = number[];
const DefaultFireParams: IFireParams = [0, 0, 0, 0, 0];

const FormContainer = (): JSX.Element => {
    const [values, setValues] = useState<number[]>(DefaultFireParams);
    const fieldLabels = [
        "Assets: ",
        "Annual income (post-tax): ",
        "Annual expenses: ",
        "Retirement expenses: ",
        "Withdrawal rate: ",
    ];

    const changeValCallback = useCallback(
        (value: number, idx: number): void => {
            if (value >= 0 && idx >= 0) {
                var newVals = values.slice();
                newVals[idx] = value;
                setValues(newVals);
                // console.log("values =",values.toString());
            }
        },
        [values],
    );

    const submitCallback = useCallback((): void => {
        console.log("submitted");
    }, []);

    return (
        <div className="Form-Container">
            <table >
                <tbody>
                    {
                        fieldLabels.map(
                            (label, idx) =>
                                <DataInput label={label} key={idx}
                                    value={values[idx]}
                                    idx={idx} callback={changeValCallback} />
                        )
                    }
                </tbody>
            </table>
            <br />
            <button className="submit-button" onClick={submitCallback}>Calculate</button>
        </div>
    );
}

export default FormContainer;