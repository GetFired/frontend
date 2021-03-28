import React, { useCallback, } from "react";
import '../App.css';


interface IOnUpdateCallback {
    (value: number, idx: number): void;
}


interface IProps {
    label: string;
    value: number;
    idx: number;
    callback: IOnUpdateCallback;
    formPrefix?: string;
}

const DataInput = (props: IProps): JSX.Element => {
    const { label, value, idx, callback, formPrefix = "$" } = props;

    // const [value, setValue] = useState<number>();

    const handleUpdate = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>): void => {
            var userIn = Number(e.target.value);
            if (userIn != null) {
                callback(Number(e.target.value), idx);
            }
        }, [callback, idx]
    );

    return (
        <tr className="fire-input">
            <td className="input-label">
                {label}
            </td>
            <td>
                <span>{formPrefix}</span>
                <input 
                    className="number-input" 
                    type="number"
                    value={value}
                    onChange={handleUpdate} 
                />
            </td>
        </tr>
    );
}

export default DataInput;