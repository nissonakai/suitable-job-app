import React from "react";

export const Start = ({questions}) => {
    const {personality_questions, values_questions} = questions;
    console.log(typeof personality_questions);
    console.log(typeof values_questions);
    const personality_comp = personality_questions && personality_questions.map(q => <li key={q.id}>{q.title}</li>);
    const values_comp = personality_questions && values_questions.map(q => <li key={q.id}>{q.title}</li>);
    return (
        <div>
            <h1>適職診断テスト</h1>
            <h2>性格診断テスト設問一覧</h2>
            {personality_comp}
            <h2>価値観診断テスト設問一覧</h2>
            {values_comp}
        </div>
    )
}