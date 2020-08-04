import React from "react";
import { useHistory, useParams } from "react-router-dom";

export const VQuestions = ({questions, answers, setAnswers}) => {
    const history = useHistory();
    const { index } = useParams();
    let questionIndex = index - 1;

    const doAnswer = (answer) => {
        const newAnswers = answers.slice();
        newAnswers[questionIndex] = answer;
        setAnswers(newAnswers);
        const path = index < questions.length 
            ? `/values/${parseInt(index, 10) + 1}` : "/personality/1";
        history.push(path);
    };

    const buttons = [...Array(4).keys()].map(i => {
        const choiceIndex = `choice${i+1}`;
        return (
            <button onClick={() => doAnswer(i+1)} key={i+1}>{questions[questionIndex][choiceIndex]}</button>
        )
    });

    return (
        <>
            <h1>価値観診断テスト</h1>
            <em>問{index}</em>
            <p>{questions[questionIndex].title}</p>
            {buttons}
        </>
    );
};