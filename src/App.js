import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Start } from "./components/Start";
import { SectionTop } from "./components/SectionTop";
import { Board } from "./components/Board";
import { Result } from "./components/Result";
import { NotFound } from "./components/NotFound";
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";


const App = () => {

  const [vQuestions, setvQuestions] = useState([]);
  const [pQuestions, setpQuestions] = useState([]);
  const [vAnswers, setvAnswers] = useState(Array(4).fill(0));
  const [pAnswers, setpAnswers] = useState(Array(6).fill(0));

  useEffect(() => {
    const getvQuestions = () => {
      axios.get(process.env.REACT_APP_SJC_VQUESTIONS)
        .then(r => {
          const datas = r.data.data;
          setvQuestions(datas);
        }).catch(err => {
          console.log(err);
        });
    };
  
    const getpQuestions = () => {
      axios.get(process.env.REACT_APP_SJC_PQUESTIONS)
        .then(r => {
          const datas = r.data.data;
          setpQuestions(datas);
        }).catch(err => {
          console.log(err);
        });
    };

    getvQuestions();
    getpQuestions();

  }, []);


  const maxIndexs = arr => {
    const max = arr.reduce((a, b) => Math.max(a, b));
    let targetArr = [];
    arr.forEach((a, index) => {
      if(a === max) {
        targetArr.push(index);
      };
    });
    return targetArr;
  };

  const valuesMax = maxIndexs(vAnswers);
  const personalityMax = maxIndexs(pAnswers);


  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Start />
          </Route>
          <Route path="/values/top">
            <SectionTop
              type="values"
            />
          </Route>
          <Route path="/values/:index">
            <Board 
              questions={vQuestions}
              answers={vAnswers}
              setAnswers={setvAnswers}
              type="values"
            />
          </Route>
          <Route path="/personality/top">
            <SectionTop
              type="personality"
            />
          </Route>
          <Route path="/personality/:index">
            <Board 
              questions={pQuestions}
              answers={pAnswers}
              setAnswers={setpAnswers}
              type="personality"
            />
          </Route>
          <Route path="/result">
            <Result
              valuesMax={valuesMax}
              personalityMax={personalityMax}
              setpAnswers={setpAnswers}
              setvAnswers={setvAnswers}
            />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
