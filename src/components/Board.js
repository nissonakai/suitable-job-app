import React from "react";
import { useHistory, useParams } from "react-router-dom";

export const Board = ({questions, answers, setAnswers, type}) => {
    const history = useHistory();
    const { index } = useParams();
    let questionIndex = index - 1;

    console.log(answers);

    const doAnswer = answer => {
        const newAnswers = answers.slice().map((current, i) => current + answer[i]); // 配列同士の足し算
        setAnswers(newAnswers);
        const path = index < questions.length 
            ? `/${type}/${parseInt(index, 10) + 1}` : type === "values" 
                ? "/personality/top" : "/result"
        history.push(path);
    };

    const choices_count = type === "values" ? 4 : 2;

    const buttons = [...Array(choices_count).keys()].map(i => {
        const vAnswerFnc = n => n === i ? 1 : 0;
        const pAnswerFnc = n => questions[questionIndex][`count${n+1}`];
        const answerFnc = type === "values" ? vAnswerFnc : pAnswerFnc;
        const answer = [...Array(answers.length).keys()].map(answerFnc);
        return (
            <button onClick={() => doAnswer(answer)} key={i}>{questions[questionIndex][`choice${i+1}`]}</button>
        )
    });

    const name = type === "values" ? "価値観" : "性格";

    return (
        <>
            <h1>{name}診断テスト</h1>
            <em>問{index}</em>
            <h2>{questions[questionIndex].title}</h2>
            {buttons}
        </>
    );
};