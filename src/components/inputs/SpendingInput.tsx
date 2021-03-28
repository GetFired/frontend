import React, { useState, useCallback } from "react";
import SpendingCategory, { ISpendingCategory, ICategoryCallback } from "./SpendingCategory";

import '../App.css';
import DataInput from './DataInput'


export const DefaultCategory = (): ISpendingCategory =>  ({ label: "", spending: 0 });


interface IProps {
    categories: ISpendingCategory[];
    setCategories: (cats: ISpendingCategory[]) => void;
}

const SpendingInput = (props: IProps): JSX.Element => {
    const {categories, setCategories} = props;

    const [monthlySpending, setMonthlySpending] = useState<number>(0);
    const [usingMonthlyLump, setUsingLump] = useState<boolean>(true);
    const [isExpanded, setExpanded] = useState<boolean>(true);

    // Show or hide the categories
    const expandCallback = useCallback((): void => {
        setExpanded(!isExpanded);
    }, [isExpanded]);

    // Update monthly spending listener
    const monthlyLumpCallback = useCallback((lumpSum: number): void => {
        setMonthlySpending(lumpSum);
        setUsingLump(true);

        // set a single category for the total monthly spending
        setCategories([
            {label:'total', spending:lumpSum}
        ]);
    }, [usingMonthlyLump]);

    // Add a new category
    const addCategory = useCallback((): void => {
        let newCats = categories.slice();
        newCats.push(DefaultCategory());
        setCategories(newCats);
    }, [categories]);

    // Update the values for a category
    const updateCategory: ICategoryCallback = useCallback(
        (changedCategory: ISpendingCategory, idx: number): void => {
            let newCats = categories.slice();
            newCats[idx] = changedCategory;
            setCategories(newCats);

            // Calculate new monthly spending
            let newSpending = 0;
            for(let cat of categories) {
                newSpending += cat.spending;
            }
            setMonthlySpending(newSpending);
            setUsingLump(false);
        },
        [categories]
    );

    // Build table of spending categories
    let spendingCategories: any;
    if (isExpanded) {
        spendingCategories = (
            <table>
                <thead>
                    <td className="input-label">Category</td>
                    <td className="input-label">Spending</td>
                </thead>
                <tbody>
                    {
                        categories.map((category, idx) =>
                            <SpendingCategory
                                category={category}
                                callback={updateCategory}
                                idx={idx}
                                key={idx}
                            />
                        )
                    }
                </tbody>
            </table>
        );
    }

    return (
        <div className="input-box">
            <DataInput
                label="Monthly Spending"
                value={monthlySpending}
                idx={0}
                formPrefix="$"
                callback={monthlyLumpCallback}
            />

            <div className="inline-button-text">
                <button
                    className="base-button expand-button"
                    onClick={expandCallback}>
                    {isExpanded ? '-' : '+'}
                </button>
                <span className="input-label">   Detailed View</span>
            </div>

            { isExpanded &&
                spendingCategories   
            }
            { isExpanded &&
            <button className="base-button add-button" onClick={addCategory}>Add Category</button>
            }
        </div>
    );
}

export default SpendingInput;