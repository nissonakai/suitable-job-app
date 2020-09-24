import React from "react";
import { useHistory } from "react-router-dom";

import PageHeader from "./PageHeader";

const Result = ({valuesMax, personalityMax, setpAnswers, setvAnswers}) => {
    const history = useHistory();
    const backTop = () => {
        setpAnswers(Array(6).fill(0));
        setvAnswers(Array(4).fill(0));
        history.push("/");
    };

    const valuesMaxTitle = valuesMax.length === 1 ? valuesMax[0] + 1 : valuesMax.join("・")
    const personalityMaxTitle = personalityMax.length === 1 ? personalityMax[0] + 1 : personalityMax.join("・")

    return (
        <>
            <PageHeader title="診断結果" />
            <h1>診断結果</h1>
            <p>価値観診断テスト結果：{valuesMaxTitle}タイプ</p>
            <p>性格診断テスト結果：{personalityMaxTitle}タイプ</p>
            <p 
                onClick={() => backTop()}
                className="btn"
            >トップへ</p>
        </>
        );
};

export default Result;