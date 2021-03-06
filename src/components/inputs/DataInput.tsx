import React, { useCallback, } from "react";
import '../App.css';

import PercentInput from "./PercentInput";
import MoneyInput from "./MoneyInput";



interface IOnUpdateCallback {
    (value: number, idx: number): void;
}


interface IProps {
    label: string;
    value: number;
    idx: number;
    callback: IOnUpdateCallback;
    formPrefix?: string;
    disabled?: boolean;
}

const DataInput = (props: IProps): JSX.Element => {
    const { label, value, idx, callback, formPrefix = "$", disabled=false} = props;
    //TODO: should value be a state variable in the lower forms?

    // const [value, setValue] = useState<number>();

    const handleUpdate = useCallback(
        (newValue: number): void => {
            if(!disabled)
                callback(newValue, idx);
        }, [callback, idx]
    );

    var inputForm: JSX.Element;
    switch(formPrefix) {
        case '%':
            inputForm=<PercentInput value={value} callback={handleUpdate} length={4}/>;
            break;
        case '$':
            default:
                inputForm=<MoneyInput value={value} callback={handleUpdate}/>;
            break;
    }

    return (
        <div className="fire-input">
            <div className="input-label">
                {label}
            </div>
           { inputForm}
        </div>
    );
}

export default DataInput;