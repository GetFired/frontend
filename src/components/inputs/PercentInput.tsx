import React, { useState, useCallback, } from "react";
import '../App.css'


interface IProps {
    value: number;
    callback: any;
    length?: number;
}

const unit: string = "%";

const PercentInput = (props: IProps): JSX.Element => {
    const { value, callback, length=10 } = props;
    const [usrIn, setUsrIn] = useState<string>();

    if(usrIn == null) {
        setUsrIn(value.toString());
    }

    const handleUpdate = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>): void => {
            let rawIn: string = e.target.value.replace(unit, '');
            if (Number(rawIn) != null) {
                setUsrIn(rawIn)
                callback(Number(rawIn));
            }
        }, [callback]
    );
    return (
        <input
            className="input-field"
            type="text"
            size={length}
            maxLength={5}
            value={usrIn + unit}
            onChange={handleUpdate}
        />
    );
}

export default PercentInput;