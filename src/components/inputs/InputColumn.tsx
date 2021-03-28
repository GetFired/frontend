import { useState, useCallback, useEffect } from "react";

import '../App.css';
import RetirementInput, { buildRetirementArguments, DefaultFireParams } from "./RetirementInput";
import SpendingInput, {DefaultCategory} from "./SpendingInput";
import {ISpendingCategory} from "./SpendingCategory";


const defaultAPIParams = buildRetirementArguments(DefaultFireParams);

const ApiEndpoint = "https://get-fired.ue.r.appspot.com/";

interface IProps {
    setLoadedCallback: (loaded: boolean) => void;
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

const InputColumn = (props: IProps): JSX.Element => {
    // const [monthlySpending, setMonthlySpending] = useState<any[]>([["Total", 0]]);
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
        console.log("submitted");
        console.log(nonSpendingArguments);
        console.log(spendingCategories);

        let query = nonSpendingArguments.map(el => el[0] + '=' + el[1]).join('&');
        query += buildCategoryQuery(spendingCategories);
        let queryUrl = ApiEndpoint + "month?" + query;
        console.log('querying:',queryUrl);
        fetch(queryUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    //   setIsLoaded(true);
                    //   setItems(result);
                },
                (error) => {
                    console.log(error);
                    //   setIsLoaded(true);
                    //   setError(error);
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