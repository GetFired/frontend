import  { useState, useCallback } from "react";

import '../App.css';
import RetirementInput from "./RetirementInput";
import SpendingInput from "./SpendingInput";

const InputColumn = (): JSX.Element => {
    const [spendingArguments, setSpendingArgs] = useState({});
    const [nonSpendingArguments, setNonSpendingArgs] = useState<any[]>();

    const submitCallback = useCallback((): void => {
        console.log("submitted");
        console.log(nonSpendingArguments);
    }, [nonSpendingArguments]);

    const updateNonSpendingArgs = useCallback((args: any[]): void => {
        setNonSpendingArgs(args);
        // console.log("input col: ",args);
        console.log('non spending args:', nonSpendingArguments);
        // console.log();
    }, []);

    //api: https://reactjs.org/docs/faq-ajax.html

    return (
        <div className="input-block">
            <RetirementInput updateArgs={updateNonSpendingArgs} />
            <SpendingInput />

            <button className="submit-button" onClick={submitCallback}>Calculate</button>
        </div>
    );
}

export default InputColumn;