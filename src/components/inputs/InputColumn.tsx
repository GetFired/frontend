import { useState, useCallback, useEffect } from "react";

import '../App.css';
import RetirementInput, { buildRetirementArguments, DefaultFireParams } from "./RetirementInput";
import SpendingInput from "./SpendingInput";

const defaultAPIParams = buildRetirementArguments(DefaultFireParams);

const ApiEndpoint = "https://get-fired.ue.r.appspot.com/";

const InputColumn = (): JSX.Element => {
    const [monthlySpending, setMonthlySpending] = useState<number>(0);
    const [nonSpendingArguments, setNonSpendingArgs] = useState<any[]>(defaultAPIParams);

    // updates retirement parameters
    const updateNonSpendingArgs = useCallback((args: any[]): void => {
        setNonSpendingArgs(args);
    }, []);

    // updates monthly spending
    const updateSpending = useCallback((spending: number): void => {
        setMonthlySpending(spending);
    }, []);
    //api: https://reactjs.org/docs/faq-ajax.html


    const submitCallback = useCallback((): void => {
        console.log("submitted");
        console.log(nonSpendingArguments);
        console.log(monthlySpending);

        let query = nonSpendingArguments.map(el => el[0] + '=' + el[1]);
        fetch(ApiEndpoint + "/month/" + query)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    //   setIsLoaded(true);
                    //   setItems(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    //   setIsLoaded(true);
                    //   setError(error);
                }
            );
    }, [nonSpendingArguments, monthlySpending]);

    return (
        <div className="input-block">
            <RetirementInput updateArgs={updateNonSpendingArgs} />
            <SpendingInput monthlySpending={monthlySpending} setMonthlySpending={updateSpending} />

            <button className="base-button submit-button" onClick={submitCallback}>Calculate</button>
        </div>
    );
}

export default InputColumn;