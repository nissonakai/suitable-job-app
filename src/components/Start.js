import React from "react";
import { Link } from "react-router-dom";

export const Start = () => {
    return (
        <div>
            <h1>適職診断テスト</h1>
            <button>
                <Link to="/values/1">始める</Link>  
            </button>
        </div>
    )
}