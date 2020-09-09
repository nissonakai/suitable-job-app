import React from "react";
import { useHistory } from "react-router-dom";

const Start = () => {
    const history = useHistory();
    return (
        <div>
            <h1>
                <img 
                    src={`${process.env.PUBLIC_URL}/logo.png`}
                    alt="ロゴ"
                    className="top-logo"
                />
            </h1>
            <p 
                className="btn"
                onClick={() => history.push("/values/top")}
            >
                始める 
            </p>
        </div>
    )
};

export default Start;