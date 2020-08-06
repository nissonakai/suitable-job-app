import React from "react";
import { useHistory } from "react-router-dom";

export const SectionTop = ({type}) => {
    const history = useHistory();
    const name = type === "values" ? "価値観" : "性格";
    const jump_test = () => {
        history.push(`/${type}/1`);
    };
    return (
        <>
            <h1>{name}診断テスト</h1>
            <p>説明説明説明説明説明説明説明説明説明説明説明</p>
            <button onClick={() => jump_test()}>始める</button>
        </>
    )
};