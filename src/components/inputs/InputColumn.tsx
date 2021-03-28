import React, { useState, useCallback } from "react";

import '../App.css';
import RetirementInput from "./RetirementInput";
import SpendingInput from "./SpendingInput";

const InputColumn = (): JSX.Element => {
    const [spendingArguments, setSpendingArgs] = useState({});
    const [nonSpendingArguments, setNonSpendingArgs] = useState({});

    const submitCallback = useCallback((): void => {
        console.log("submitted");
    }, []);

    //api: https://reactjs.org/docs/faq-ajax.html
    
    return (
    <div className="input-block">
        
            <RetirementInput/>
        
        <div className="input-box">
            <SpendingInput />
        </div>
        <button className="submit-button" onClick={submitCallback}>Calculate</button>
    </div>
    );
}

export default InputColumn;