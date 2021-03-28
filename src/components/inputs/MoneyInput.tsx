import React, { useCallback, } from "react";
import '../App.css';

interface IProps {
    value: number;
    callback: any;
}

const unit: string = "$";

const MoneyInput = (props: IProps): JSX.Element => {
    const { value, callback} = props;

    // const [value, setValue] = useState<number>();

    const handleUpdate = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>): void => {
            let rawIn: string = e.target.value.slice(1)
            console.log(e.target.value, rawIn);
            if (Number(rawIn) != null) {
                callback(Number(rawIn));
            }
        }, [callback]
    );

    return (
        <input
            className="number-input"
            type="text"
            size={10}
            maxLength={10}
            value={unit+value}
            onChange={handleUpdate}
        />
    );
}

export default MoneyInput;