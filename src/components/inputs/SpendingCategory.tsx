import React, { useCallback, useState} from "react";
import '../App.css';

import MoneyInput from "./MoneyInput";


export interface ISpendingCategory {
    label: string;
    spending: number;
}

export interface ICategoryCallback {
    (changedCategory: ISpendingCategory, idx: number): void;
}


interface IProps {
    category: ISpendingCategory;
    idx: number;
    callback: ICategoryCallback;
}

function getPlaceholder():string {
    let items: string[] = [
        "Rent", "Groceries", "Snacks", "Gambling",
        "Pets", "Dates", "Tinder Guys",
        "Charity", "Skiing", "Lubricant", "Netflix",
        "Eating out", "Misc", "Credit Card", "Loans",
        "Mortgage"
    ];
    return items[Math.floor(Math.random() * items.length)]
}

const SpendingCategory = (props: IProps): JSX.Element => {
    const { category, idx, callback, } = props;
    //TODO: should value be a state variable in the lower forms?

    const [placeholder,_] = useState<string>(getPlaceholder());

    const updateSpending = useCallback(
        (newValue: number): void => {
            category.spending = newValue;
            callback(category, idx);
        }, [callback, idx]
    );

    const updateLabel = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>): void => {
            category.label = e.target.value;
            callback(category, idx);
        }, [callback, idx]
    );


    return (
        <tr className="">
            <td className="input-label">
                <input
                    className="input-field"
                    type="text"
                    size={10}
                    maxLength={15}
                    value={category.label}
                    onChange={updateLabel}
                    placeholder={'Eg. ' + placeholder}
                />
        </td>
            <td>
                <MoneyInput value={category.spending} callback={updateSpending} length={5}/>    
            </td>
        </tr>
    );
}

export default SpendingCategory;