import React, { useCallback, } from "react";
import '../App.css';

interface IProps {
    value: number;
    callback: any;
    length?: number;
}

const unit: string = "$";

const MoneyInput = (props: IProps): JSX.Element => {
    const { value, callback, length=10} = props;

    // const [value, setValue] = useState<number>();

    const handleUpdate = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>): void => {
            let rawIn: string = e.target.value.slice(1)
            if (Number(rawIn) != null) {
                callback(Number(rawIn));
            }
        }, [callback]
    );

    return (
        <input
            className="input-field"
            type="text"
            size={length}
            maxLength={10}
            value={unit+value}
            onChange={handleUpdate}
        />
    );
}

export default MoneyInput;