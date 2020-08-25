import React from "react";
import { useHistory } from "react-router-dom";

const Start = () => {
    const history = useHistory();
    return (
        <div>
            <h1>適職診断テスト</h1>
            <button onClick={() => history.push("/values/top")}>
                始める 
            </button>
        </div>
    )
};

export default Start;