import React from "react";
import { useHistory } from "react-router-dom";
import Constants from "../Constants";

const SectionTop = ({type}) => {
    const { sectionTexts } = Constants;
    const history = useHistory();
    
    const texts = type === "values" ? sectionTexts["values"] : sectionTexts["personality"];
    const test_start = () => history.push(`/${type}/1`);
    return (
        <>
            <h1>{texts.name}診断テスト</h1>
            <p>{texts.body}</p>
            <button onClick={() => test_start()}>始める</button>
        </>
    )
};

export default SectionTop;