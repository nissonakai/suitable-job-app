import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Transition } from "react-transition-group";

const FLIP_STYLE = {
    // 前面⇒背面
    entering: {
      transition: 'all .5s ease',
      transform: 'perspective(25rem) rotateY(-360deg)'
    },
    // 背面
    entered: {
      transition: '',
      transform: 'perspective(25rem) rotateY(0deg)'
    },
    // 背面⇒前面
    exiting: {
      transition: 'all .5s ease',
      transform: 'perspective(25rem) rotateY(-360deg)'
    },
    // 前面
    exited: {
      transition: '',
      transform: 'perspective(25rem) rotateY(0)'
    }
  };

export const Board = ({questions, answers, setAnswers, type}) => {
    const [flip, setFlip] = useState(false);
    const history = useHistory();
    const { index } = useParams();
    let questionIndex = index ? index - 1 : 0;
    console.log(answers);

    const doAnswer = answer => {
        const newAnswers = answers.slice().map((current, i) => current + answer[i]); // 配列同士の足し算
        setAnswers(newAnswers);
        setFlip(!flip);
        const path = index < questions.length 
            ? `/${type}/questions/${parseInt(index, 10) + 1}` : type === "values" ? "/personality/top" : "/result"
        history.push(path);
    };

    const choices_count = type === "values" ? 4 : 2;

    const buttons = [...Array(choices_count).keys()].map(i => {
        const vAnswer = [...Array(answers.length).keys()].map(n => n === i ? 1 : 0);
        const pAnswer = questions[questionIndex][`count${i === 0 ? 'A' : 'B'}`].split("").map(n => parseInt(n, 10));
        const answer = type === "values" ? vAnswer : pAnswer;
        return (
            <p 
                onClick={() => doAnswer(answer)} key={i}
                className="btn"
            >
                {questions[questionIndex][`choice${i+1}`]}
            </p>
        )
    });

    const name = type === "values" ? "価値観" : "性格";

    return (
        <>
            <h1>{name}診断テスト</h1>
            <Transition
                in={flip}
                timeout={550}
            >{state => (
                <div className="flip-card" style={FLIP_STYLE[state]}>
                    <em>問{index}</em>
                    <h2>{questions[questionIndex].title}</h2>
                    {buttons}
                </div>
            )}
            </Transition>
        </>
    );
};

export default Board;