import { useState, useCallback, useEffect } from "react";

import '../App.css';
import RetirementInput, { buildRetirementArguments, DefaultFireParams } from "./RetirementInput";
import SpendingInput, {DefaultCategory} from "./SpendingInput";
import {ISpendingCategory} from "./SpendingCategory";


const defaultAPIParams = buildRetirementArguments(DefaultFireParams);

const ApiEndpoint = "https://get-fired.ue.r.appspot.com/";

export enum DataStatus {
    Empty,
    Loading,
    Loaded,
    Error
}

interface IProps {
    setLoadedCallback: (loaded: number) => void;
    setDataCallback: (data: object) => void;
}

function buildCategoryQuery(categories: ISpendingCategory[]) {
    let queryString: string = "";

    for(let idx in categories) {
        let cat = categories[idx];
        let label = cat.label.length > 0 ? cat.label : "category"+idx;
        queryString += '&categories=' + label + "&expenses=" + cat.spending;
    }

    return queryString;
}

function getMonthlyExpenses(categories: ISpendingCategory[]) {
    let totalExp = 0;
    for(let cat of categories) {
        totalExp += cat.spending;
    }
    
    return totalExp;
}

function pullData(spendingCategories: ISpendingCategory[], nonSpendingArguments: any[]) {

}

const InputColumn = (props: IProps): JSX.Element => {
    const {setLoadedCallback, setDataCallback} = props;

    const [spendingCategories, setCategories] = useState<ISpendingCategory[]>([DefaultCategory()]);
    const [nonSpendingArguments, setNonSpendingArgs] = useState<any[]>(defaultAPIParams);

    // updates retirement parameters
    const updateNonSpendingArgs = useCallback((args: any[]): void => {
        setNonSpendingArgs(args);
    }, []);

    // updates monthly spending
    // const updateSpending = useCallback((spending: number): void => {
    //     setMonthlySpending(spending);
    // }, []);
    //api: https://reactjs.org/docs/faq-ajax.html


    const submitCallback = useCallback((): void => {
        setLoadedCallback(DataStatus.Loading);
        
        console.log("submitted");
        console.log(nonSpendingArguments);
        console.log(spendingCategories);

        let query = nonSpendingArguments.map(el => el[0] + '=' + el[1]).join('&');
        let categoryQuery = buildCategoryQuery(spendingCategories);
        let expensesQuery = '&curr_expenses='+ (getMonthlyExpenses(spendingCategories) * 12);

        let breakDownQuery = ApiEndpoint + "month?" + query + categoryQuery;
        console.log('querying:',breakDownQuery);
        
        fetch(breakDownQuery)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("result1:", result)
                    setDataCallback(result);
                    setLoadedCallback(DataStatus.Loaded);
                },
                (error) => {
                    console.log("err1:",error);
                    setLoadedCallback(DataStatus.Error);
                }
            );
        
       
    }, [nonSpendingArguments, spendingCategories]);

    return (
        <div className="input-block">
            <RetirementInput updateArgs={updateNonSpendingArgs} />
            <SpendingInput categories={spendingCategories} setCategories={setCategories} />

            <button className="base-button submit-button" onClick={submitCallback}>Calculate</button>
        </div>
    );
}

export default InputColumn;