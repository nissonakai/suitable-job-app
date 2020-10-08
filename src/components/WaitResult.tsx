import React, { memo, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Progressbar from "./ProgressBar";

interface Props {
  docWaiting: string;
  docWaited: string;
}

const WaitResult: React.FC<Props> = memo(({ docWaiting, docWaited }) => {
  const history = useHistory();
  const [complete, setComplete] = useState(false);
  const [now, setNow] = useState(0);
  const waitObj = {
    waiting: {
      img: docWaiting,
      alt: "結果計算中の博士",
      text: "結果計算中…",
    },
    waited: {
      img: docWaited,
      alt: "結果計算完了の博士",
      text: "結果計算完了！",
    },
  };
  const wait = complete ? waitObj["waited"] : waitObj["waiting"];
  setTimeout(() => {
    setComplete(true);
  }, 4000);
  setTimeout(() => history.push("/result"), 5000);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow((prevNow) => (prevNow >= 100 ? 100 : prevNow + 20));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="wait_box">
      <h1 className="wait_text">{wait.text}</h1>
      <img src={wait.img} alt={wait.alt} className="wait_doc" />
      <Progressbar now={now} length={100} type="waiting" />
    </div>
  );
});

export default WaitResult;