import React from "react";
import { useHistory } from "react-router-dom";

export const Result = ({setPersonalityAnswers, setValuesAnswers}) => {
    const history = useHistory();
    const backTop = () => {
        setPersonalityAnswers(Array(6).fill(0));
        setValuesAnswers(Array(4).fill(0));
        history.push("/");
    };
    return (
        <>
            <h1>診断結果</h1>
            <button onClick={() => backTop()}>トップへ</button>
        </>
        );
};