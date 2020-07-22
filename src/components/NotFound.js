import React from "react";
import { useHistory } from "react-router-dom";


export const NotFound = () => {
    const history = useHistory();

    setTimeout(() => {
        history.push("/");
    }, 3000);

    return (
        <>
            <h1>ページが存在しません。</h1>
            <p>3秒後にトップページにリダイレクトします。</p>
        </>
    );
};