import React, { useState, useCallback, } from "react";
import '../App.css'


interface IProps {
    value: number;
    callback: any;
}

const unit: string = "%";

const PercentInput = (props: IProps): JSX.Element => {
    const { value, callback } = props;
    const [usrIn, setUsrIn] = useState<string>();

    if(usrIn == null) {
        setUsrIn(value.toString());
    }

    const handleUpdate = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>): void => {
            let rawIn: string = e.target.value.replace(unit, '');
            console.log(e.target.value, rawIn, Number(rawIn));
            if (Number(rawIn) != null) {
                setUsrIn(rawIn)
                callback(Number(rawIn));
            }
        }, [callback]
    );
    return (
        <input
            className="number-input"
            type="text"
            size={10}
            maxLength={5}
            value={usrIn + unit}
            onChange={handleUpdate}
        />
    );
}

export default PercentInput;